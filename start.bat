cd /d "%~dp0"
cd start
echo Running script from:
cd

set "dir=%~dp0
"
wt new-tab cmd /k "cd /d \"%dir%\start\" && call startFrontend.bat" ; new-tab cmd /k "cd /d \"%dir%\start\" && call startBackend.bat"