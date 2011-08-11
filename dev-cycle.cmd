:: An auto install tool that helps with the development cycle
:: Requires: 
::  - Watchdog (http://packages.python.org/watchdog/) Python API library and shell 
::    utilities to monitor file system events.
::  - Python (http://python.org) -- of course
@echo off
setlocal

set watch_files="*.html;*.js;*.css;*.xml"

echo.
echo Hi I am Watchdog!
echo.
echo I will be monitoring your development directory 
echo and I'll auto-install the gadget when you make changes to
echo %watch_files% types of files
echo.

watchmedo shell-command --patterns=%watch_files% --ignore-patterns="*build*" --recursive --command=install
echo.

endlocal