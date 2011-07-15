@echo off
setlocal
:: Simple development and build automation

set gadget_name=TimeSense
set source_dir=%~p0%gadget_name%.gadget
set install_dir=%LOCALAPPDATA%\Microsoft\Windows Sidebar\Gadgets\%gadget_name%.gadget

echo.
echo Installing %gadget_name%.gadget
echo =====================================
echo.

:: clean-install the gadget
if not exist "%install_dir%" (
    echo "Creating install directory for %gadget_name%"
    mkdir "%install_dir%"
)

echo.
echo Deleting existing installation
echo -------------------------------
echo.
del /F /S /Q "%install_dir%\*.*"

echo.
echo Copying files...
echo -------------------------------
echo.
echo from: %source_dir%
echo to: %install_dir%
echo.
xcopy /E "%source_dir%\*.*" "%install_dir%"

echo.
echo. Done!
echo.
echo.
endlocal