#!/usr/bin/env python3

import os
import json
import logging
import schedule
import time
import signal
import sys
from datetime import datetime
from git import Repo, GitCommandError
from retrying import retry
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class AutoCommitter:
    def __init__(self):
        self.config_path = r"C:\Users\Kamlesh\commits\auto_commit_config.json"
        self.log_path = r"C:\Users\Kamlesh\commits\auto_commit.log"
        self.setup_logging()
        self.load_config()
        self.setup_signal_handlers()
        
    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.log_path),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
        
    def load_config(self):
        default_config = {
            "repo_path": r"C:\Users\Kamlesh\commits",
            "file_to_update": "daily.txt",
            "commit_message": "Daily auto-commit",
            "branch": "main",
            "remote": "origin",
            "commit_time": "20:00",
            "email_notifications": {
                "enabled": False,
                "smtp_server": "smtp.gmail.com",
                "smtp_port": 587,
                "sender_email": "",
                "sender_password": "",
                "receiver_email": ""
            }
        }
        
        if os.path.exists(self.config_path):
            try:
                with open(self.config_path, 'r') as f:
                    self.config = json.load(f)
                self.logger.info("Configuration loaded from file")
            except Exception as e:
                self.logger.error(f"Error loading config: {e}")
                self.config = default_config
        else:
            self.config = default_config
            
        self.save_config()
        
    def save_config(self):
        try:
            os.makedirs(os.path.dirname(self.config_path), exist_ok=True)
            with open(self.config_path, 'w') as f:
                json.dump(self.config, f, indent=4)
            self.logger.info("Configuration saved")
        except Exception as e:
            self.logger.error(f"Error saving config: {e}")
            
    def setup_signal_handlers(self):
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)
        
    def signal_handler(self, signum, frame):
        self.logger.info("Received interrupt signal. Shutting down gracefully...")
        sys.exit(0)
        
    def validate_repo(self):
        try:
            if not os.path.exists(self.config["repo_path"]):
                raise Exception(f"Repository path does not exist: {self.config['repo_path']}")
                
            repo = Repo(self.config["repo_path"])
            
            if repo.bare:
                raise Exception("Repository is bare")
                
            if self.config["branch"] not in [ref.name.split('/')[-1] for ref in repo.refs]:
                raise Exception(f"Branch '{self.config['branch']}' does not exist")
                
            self.logger.info("Repository validation successful")
            return True
            
        except Exception as e:
            self.logger.error(f"Repository validation failed: {e}")
            return False
            
    def send_email_notification(self, subject, body):
        if not self.config["email_notifications"]["enabled"]:
            return
            
        try:
            email_config = self.config["email_notifications"]
            
            msg = MIMEMultipart()
            msg['From'] = email_config["sender_email"]
            msg['To'] = email_config["receiver_email"]
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'plain'))
            
            server = smtplib.SMTP(email_config["smtp_server"], email_config["smtp_port"])
            server.starttls()
            server.login(email_config["sender_email"], email_config["sender_password"])
            
            text = msg.as_string()
            server.sendmail(email_config["sender_email"], email_config["receiver_email"], text)
            server.quit()
            
            self.logger.info("Email notification sent successfully")
            
        except Exception as e:
            self.logger.error(f"Failed to send email notification: {e}")
            
    @retry(stop_max_attempt_number=3, wait_fixed=60000)
    def perform_git_operations(self):
        try:
            repo = Repo(self.config["repo_path"])
            
            # Check if repo is dirty and stash changes if needed
            if repo.is_dirty():
                self.logger.info("Repository is dirty, stashing changes")
                repo.git.stash('save', 'auto-commit stash before pull')
                
            # Switch to target branch
            if repo.active_branch.name != self.config["branch"]:
                repo.git.checkout(self.config["branch"])
                
            # Pull latest changes
            origin = repo.remotes[self.config["remote"]]
            origin.pull()
            
            # Create timestamp
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            commit_line = f"Auto-commit on {timestamp}\n"
            
            # Update the file
            file_path = os.path.join(self.config["repo_path"], self.config["file_to_update"])
            with open(file_path, 'a', encoding='utf-8') as f:
                f.write(commit_line)
                
            # Stage the file
            repo.index.add([self.config["file_to_update"]])
            
            # Commit
            repo.index.commit(self.config["commit_message"])
            
            # Push
            origin.push()
            
            self.logger.info(f"Successfully committed and pushed: {commit_line.strip()}")
            return True
            
        except GitCommandError as e:
            self.logger.error(f"Git command error: {e}")
            raise
        except Exception as e:
            self.logger.error(f"Error during git operations: {e}")
            raise
            
    def daily_commit_job(self):
        self.logger.info("Starting daily commit job")
        
        try:
            if not self.validate_repo():
                raise Exception("Repository validation failed")
                
            self.perform_git_operations()
            self.logger.info("Daily commit job completed successfully")
            
        except Exception as e:
            error_msg = f"Daily commit job failed: {e}"
            self.logger.error(error_msg)
            self.send_email_notification(
                "Auto-commit Failed",
                f"The daily auto-commit failed with the following error:\n\n{error_msg}"
            )
            
    def run_scheduler(self):
        # Schedule daily commits
        schedule.every().day.at(self.config["commit_time"]).do(self.daily_commit_job)
        
        # Check if we should run immediately (for today's first run)
        now = datetime.now()
        scheduled_time = datetime.strptime(self.config["commit_time"], "%H:%M").time()
        today_scheduled = datetime.combine(now.date(), scheduled_time)
        
        if now >= today_scheduled:
            # If it's already past today's scheduled time, run it now
            self.logger.info("Running initial commit for today")
            self.daily_commit_job()
        
        self.logger.info(f"Scheduler started. Daily commits scheduled at {self.config['commit_time']}")
        
        while True:
            try:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
            except KeyboardInterrupt:
                self.logger.info("Scheduler stopped by user")
                break
            except Exception as e:
                self.logger.error(f"Scheduler error: {e}")
                time.sleep(300)  # Wait 5 minutes before retrying
                
def main():
    auto_committer = AutoCommitter()
    
    if not auto_committer.validate_repo():
        print("Repository validation failed. Please check the logs.")
        sys.exit(1)
        
    print(f"Starting auto-commit scheduler...")
    print(f"Repository: {auto_committer.config['repo_path']}")
    print(f"Scheduled time: {auto_committer.config['commit_time']} daily")
    print(f"Log file: {auto_committer.log_path}")
    print("Press Ctrl+C to stop the scheduler")
    
    auto_committer.run_scheduler()

if __name__ == "__main__":
    main()