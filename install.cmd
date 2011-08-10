@echo off
setlocal
:: Simple development and build automation

echo %1
echo %2

endlocal
goto :eof

set gadget_name=TimeSense
set version=dev
set package_name=TimeSense-%version%
set source_dir=%~p0%gadget_name%.gadget
set build_dir=%~p0build\%package_name%.gadget
set install_dir=%LOCALAPPDATA%\Microsoft\Windows Sidebar\Gadgets\%package_name%.gadget

echo.
echo Building...
echo -------------------------------
echo.
echo in: %source_dir%
echo out: %build_dir%
echo.

if not exist "%build_dir%" (
    echo "Creating build directory for %package_name%"
    mkdir "%build_dir%"
)

xcopy /E "%source_dir%\*.*" "%build_dir%"
endlocal
goto :eof

echo.
echo Installing %package_name%.gadget
echo -------------------------------
echo.

:: clean-install the gadget
if not exist "%install_dir%" (
    echo "Creating install directory for %package_name%"
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