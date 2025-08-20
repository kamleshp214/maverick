import os
import subprocess
from datetime import datetime

# Path to your repo folder
REPO_PATH = r'C:\Users\Kamlesh\mycommits'

# Change to repo directory
os.chdir(REPO_PATH)

# Create/update a dummy file
FILENAME = 'dummy_commit_file.txt'

def run_command(command):
    result = subprocess.run(command, shell=True, text=True, capture_output=True)
    if result.returncode != 0:
        print(f"Error running command: {command}\n{result.stderr}")
        exit(1)
    return result.stdout.strip()

def make_commit(i):
    with open(FILENAME, 'a') as f:
        f.write(f"Commit #{i} at {datetime.now()}\n")

    run_command('git add .')
    run_command(f'git commit -m "Auto commit #{i}"')
    print(f"✅ Commit #{i} done")

def push_changes():
    run_command('git push origin main')
    print("🚀 All commits pushed to GitHub!")

def main():
    print("🚧 Starting 100 commits...")
    for i in range(1, 101):
        make_commit(i)
    push_changes()
    print("✅ Done! Your GitHub contribution graph should show green!")

if __name__ == "__main__":
    main()
