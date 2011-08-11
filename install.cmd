@echo off
setlocal
:: Simple development and build automation

set gadget_name=TimeSense
set version=dev
set package_name=TimeSense-%version%
set source_dir=%~p0%gadget_name%.gadget
set build_dir=%~p0build\%package_name%.gadget
set install_dir=%LOCALAPPDATA%\Microsoft\Windows Sidebar\Gadgets\%package_name%.gadget

echo.
echo Build %package_name%
echo -------------------------
echo.
echo in: %source_dir%
echo out: %build_dir%
echo.

if not exist "%build_dir%" (
    echo Creating %build_dir%
    mkdir "%build_dir%"
) else (
    echo Cleaning existing %build_dir%
    del /F /S /Q "%build_dir%\*.*"
)
echo.
echo building...
echo.
xcopy /E "%source_dir%\*.*" "%build_dir%"


echo.
echo Install %package_name%
echo --------------------------
echo.
echo from: %build_dir%
echo to: %install_dir%
echo.

:: clean-install the gadget
if not exist "%install_dir%" (
    echo Creating %install_dir%
    mkdir "%install_dir%"
) else (
    echo Cleaning existing %install_dir%
    del /F /S /Q "%install_dir%\*.*"
)
echo.
echo installing...
echo.
xcopy /E "%build_dir%\*.*" "%install_dir%"


echo.
echo Done!
echo.
echo.
endlocal