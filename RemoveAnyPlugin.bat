@echo off
setlocal enabledelayedexpansion

set /p folder_name=Enter the submodule folder name to remove (inside patches/src/userplugins/): 

set full_path=patches/src/userplugins/%folder_name%

if not exist "%full_path%" (
    echo ❌ Folder "%full_path%" does not exist.
    pause
    exit /b
)

git submodule deinit -f %full_path%
git rm -f %full_path%
rmdir /s /q .git\modules\%full_path%


echo ✅ Submodule at "%full_path%" has been removed.
pause
