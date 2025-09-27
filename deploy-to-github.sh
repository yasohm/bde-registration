#!/bin/bash

echo "========================================"
echo "   BDE Registration System - GitHub Deploy"
echo "========================================"
echo

echo "Step 1: Initializing Git repository..."
git init

echo
echo "Step 2: Adding all files..."
git add .

echo
echo "Step 3: Creating initial commit..."
git commit -m "Initial commit - BDE Registration System"

echo
echo "Step 4: Setting main branch..."
git branch -M main

echo
echo "========================================"
echo "IMPORTANT: You need to create a GitHub repository first!"
echo "========================================"
echo
echo "1. Go to https://github.com/"
echo "2. Click 'New repository'"
echo "3. Name it: bde-registration-system"
echo "4. Make it Public"
echo "5. Don't check 'Add README'"
echo "6. Click 'Create repository'"
echo
echo "After creating the repository, press Enter to continue..."
read

echo
echo "Step 5: Please enter your GitHub username:"
read -p "Username: " GITHUB_USERNAME

echo
echo "Step 6: Adding remote origin..."
git remote add origin https://github.com/$GITHUB_USERNAME/bde-registration-system.git

echo
echo "Step 7: Pushing to GitHub..."
git push -u origin main

echo
echo "========================================"
echo "   SUCCESS! Your project is now on GitHub!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Go to https://vercel.com/"
echo "2. Import your GitHub repository"
echo "3. Add environment variables"
echo "4. Deploy!"
echo
