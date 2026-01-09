@echo off
REM Database Export Script for Windows
REM This script exports the event-management database structure and data

SET DB_NAME=event-management
SET DB_USER=root
SET DB_PASSWORD=root
SET DB_HOST=localhost
SET DB_PORT=3306
SET BACKUP_DIR=database-backup
SET TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
SET TIMESTAMP=%TIMESTAMP: =0%
SET BACKUP_FILE=%BACKUP_DIR%\event-management-%TIMESTAMP%.sql

REM Create backup directory if it doesn't exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo Starting database export...
echo Database: %DB_NAME%
echo Output: %BACKUP_FILE%

REM Export database (assumes mysqldump is in PATH or MySQL bin folder)
mysqldump -h %DB_HOST% ^
  -P %DB_PORT% ^
  -u %DB_USER% ^
  -p%DB_PASSWORD% ^
  --databases %DB_NAME% ^
  --add-drop-database ^
  --routines ^
  --triggers ^
  --events ^
  --single-transaction ^
  --quick ^
  --lock-tables=false ^
  > "%BACKUP_FILE%"

if %ERRORLEVEL% EQU 0 (
  echo ✓ Database exported successfully!
  echo File: %BACKUP_FILE%
  
  REM Copy to latest.sql
  copy /Y "%BACKUP_FILE%" "%BACKUP_DIR%\latest.sql" > nul
  echo Latest backup: %BACKUP_DIR%\latest.sql
) else (
  echo × Export failed!
  exit /b 1
)
