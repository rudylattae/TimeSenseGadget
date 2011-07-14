@echo off
setlocal
:: Simple development and build automation

set gadget_name=TimeSense
set source_dir=%~p0%gadget_name%.gadget
set install_dir=%LOCALAPPDATA%\Microsoft\Windows Sidebar\Gadgets\%gadget_name%.gadget

:: clean-install the gadget
if not exist "%install_dir%" (
    echo "Creating install directory for %gadget_name%"
    mkdir "%install_dir%"
)
del /F /S /Q "%install_dir%\*.*"
echo "Copying files..."
echo "from: %source_dir%" 
echo "to: %install_dir%"
xcopy /E "%source_dir%\*.*" "%install_dir%"
endlocal