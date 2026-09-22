@echo off
title Aakriti Portfolio - One-Click GitHub Deployer
color 0A

echo =======================================================
echo   AAKRITI - CYBERSECURITY PORTFOLIO GITHUB DEPLOYER
echo =======================================================
echo.

setlocal enabledelayedexpansion

echo Choose deployment target:
echo [1] https://aakriti17.github.io/ (Repo: aakriti17.github.io) [RECOMMENDED]
echo [2] https://aakriti17.github.io/portfolio (Repo: portfolio)
echo [3] Custom GitHub repository URL
echo.

set /p choice="Enter option (1, 2, or 3): "

if "%choice%"=="1" (
    set "REPO_URL=https://github.com/aakriti17/aakriti17.github.io.git"
    set "SITE_URL=https://aakriti17.github.io/"
) else if "%choice%"=="2" (
    set "REPO_URL=https://github.com/aakriti17/portfolio.git"
    set "SITE_URL=https://aakriti17.github.io/portfolio/"
) else if "%choice%"=="3" (
    set /p REPO_URL="Enter your full GitHub Repo HTTPS URL: "
    set "SITE_URL=your repository GitHub Pages URL"
) else (
    echo Invalid choice. Defaulting to aakriti17.github.io...
    set "REPO_URL=https://github.com/aakriti17/aakriti17.github.io.git"
    set "SITE_URL=https://aakriti17.github.io/"
)

echo.
echo [1/4] Initializing Git repository...
if not exist ".git" (
    git init
)

echo [2/4] Staging all portfolio files & assets...
git add .

echo [3/4] Creating deployment commit...
git commit -m "Deploy Aakriti Cybersecurity Portfolio" --allow-empty

echo [4/4] Configuring remote and pushing to main branch...
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo =======================================================
    echo  [SUCCESS] Portfolio successfully pushed to GitHub!
    echo =======================================================
    echo.
    echo Your portfolio will be live shortly at:
    echo %SITE_URL%
    echo.
    echo Note: If this is a new repo, make sure GitHub Pages is enabled:
    echo Repository -^> Settings -^> Pages -^> Branch: main / (root) -^> Save
) else (
    echo.
    echo [ERROR] Push failed. Please check if the repository exists on GitHub
    echo and that you have logged into Git with your credentials.
)

echo.
pause
