@echo off
setlocal
cd /d %~dp0

REM 1) Unpack runtime env (first run only)
if not exist "%~dp0env\" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0environment.ps1"
)

if not exist "%~dp0env\python.exe" (
  echo Failed to unpack environment.
  pause
  exit /b 1
)

REM 2) Install your wheel into the packed env (first run only)
if not exist "%~dp0env\Scripts\LocalWorld.exe" (
  "%~dp0env\python.exe" -m pip install --no-deps --no-warn-script-location "%~dp0app.whl"
)

REM 3) Run the only entrypoint
"%~dp0env\Scripts\LocalWorld.exe"
