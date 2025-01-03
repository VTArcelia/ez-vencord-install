@echo off

echo Reset script, resets Vencord, then resets all third party plugins to my repo
echo.
echo by @VTArcelia on discord
echo.
echo press any key to continue.
pause >nul

if exist "Vencord\" (
    echo Updating local Vencord repo...
    cd Vencord
    git fetch --all
    git reset --hard origin/main
    echo Vencord repo reset successfully.
) else (
    echo Vencord directory not found. Please run UpdateAndInstall.bat or Install.bat.
)

cd ..
git fetch --all
git reset --hard origin/main


exit /B 0
