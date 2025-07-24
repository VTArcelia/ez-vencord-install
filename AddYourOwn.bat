@echo off
setlocal

set /p repo_url=Enter the repo URL: 

set /p folder_name=Enter the custom folder name: 

git submodule add %repo_url% patches/src/userplugins/%folder_name%

echo.
echo ✅ Submodule added to patches/src/userplugins/%folder_name%
echo Please run UpdateandInstall.bat to continue with the installation
pause
