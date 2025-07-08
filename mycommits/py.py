import os
import subprocess
import time
from datetime import datetime
import random
import sys

# ✅ CONFIG SECTION (Edit if needed)
GIT_USERNAME = "Kamlesh Porwal"
GIT_EMAIL = "porwalkamlesh5@gmail.com"  # Must match GitHub to show green squares
REPO_PATH = os.path.abspath(".")     # Assumes script is in repo folder
COMMIT_FILE = "log.txt"              # File that receives dummy commits
COMMITS_PER_RUN = 4                  # Number of commits per run
DELAY_BETWEEN_COMMITS_SEC = (5, 15)  # Random wait time between commits

# ──────────────────────────────────────────────────────────────
# 🔧 UTILITY FUNCTIONS
# ──────────────────────────────────────────────────────────────

def run_command(command, cwd=REPO_PATH):
    """Runs a shell command and returns stdout."""
    result = subprocess.run(
        command,
        cwd=cwd,
        shell=True,
        text=True,
        capture_output=True
    )
    if result.returncode != 0:
        print(f"❌ Error running command: {command}")
        print(f"🔴 stderr: {result.stderr.strip()}")
        return None
    return result.stdout.strip()

def configure_git_identity():
    """Set local Git config for user name and email."""
    print("🔧 Setting Git identity...")
    run_command(f'git config user.name "{GIT_USERNAME}"')
    run_command(f'git config user.email "{GIT_EMAIL}"')
    print("✅ Git identity set.")

def check_git_remote():
    """Ensure that Git has a remote set up."""
    print("🔍 Checking remote origin...")
    remote = run_command("git remote -v")
    if not remote or "origin" not in remote:
        print("❌ No remote named 'origin' found.")
        sys.exit("⚠️ Add a remote using:\n  git remote add origin <your-repo-url>")
    else:
        print("✅ Remote found.")

def create_dummy_commit(commit_number):
    """Writes to the file and creates a commit."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_line = f"[{timestamp}] Auto commit #{commit_number}\n"
    file_path = os.path.join(REPO_PATH, COMMIT_FILE)

    # Write line to the file
    with open(file_path, "a", encoding="utf-8") as f:
        f.write(commit_line)

    # Git add and commit
    run_command("git add .")
    commit_message = f'chore(auto): commit #{commit_number} at {timestamp}'
    result = run_command(f'git commit -m "{commit_message}"')

    if result:
        print(f"✅ Commit #{commit_number} complete.")
    else:
        print(f"⚠️ Commit #{commit_number} may have failed.")

def push_to_github():
    """Push commits to remote repo."""
    print("📤 Pushing to GitHub...")
    result = run_command("git push")
    if result:
        print("✅ Push successful.")
    else:
        print("❌ Push failed. Check credentials or remote setup.")

# ──────────────────────────────────────────────────────────────
# 🚀 MAIN FUNCTION
# ──────────────────────────────────────────────────────────────

def main():
    os.chdir(REPO_PATH)
    print("🟢 Starting GitHub commit burst...\n")

    configure_git_identity()
    check_git_remote()

    for i in range(1, COMMITS_PER_RUN + 1):
        create_dummy_commit(i)
        if i < COMMITS_PER_RUN:
            wait_time = random.randint(*DELAY_BETWEEN_COMMITS_SEC)
            print(f"⏳ Waiting {wait_time} seconds before next commit...\n")
            time.sleep(wait_time)

    push_to_github()
    print("\n🎉 Done! All commits made and pushed successfully.")

# ──────────────────────────────────────────────────────────────
# 🚦 ENTRY POINT
# ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n🛑 Script interrupted.")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
