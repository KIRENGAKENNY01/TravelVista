#!/bin/bash

# Directory of your local repository
REPO_DIR="C:\Users\Kenny\Desktop\Lessons\projects\Full-stack project\TravelVista\TravelVista"
# Commit message with timestamp
COMMIT_MSG="Auto-commit on $(date '+%Y-%m-%d %H:%M:%S')"

# Navigate to the repository directory
cd "$REPO_DIR" || { echo "Directory not found"; exit 1; }

# Check for changes
git add --all
if git status --porcelain | grep -q .; then
    echo "Changes detected, committing..."
    git commit -m "$COMMIT_MSG"
    git push origin main
    echo "Changes pushed to GitHub"
else
    echo "No changes to commit"
fi