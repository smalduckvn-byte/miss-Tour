@echo off
chcp 65001 > nul
title VIETNAM WONDER TRAVEL - BO KHOI CHAY TRANG WEB

:MENU
cls
echo ======================================================================
echo             VIETNAM WONDER TRAVEL - KHOI CHAY TRANG WEB
echo                   (File script duoc tao bang Notepad)
echo ======================================================================
echo.
echo   [1] Mo trang chu website (index.html) tren trinh duyet mac dinh
echo   [2] Mo ban All-In-One (website-all-in-one.html - Tat ca trong 1 file)
echo   [3] Mo file code bang Notepad de chinh sua
echo   [4] Mo thu muc chua file code
echo   [5] Thoat
echo.
echo ======================================================================
set /p choice=" Xin moi ban chon (Nhan 1, 2, 3, 4, 5) roi an Enter [Mac dinh: 1]: "

if "%choice%"=="" set choice=1
if "%choice%"=="1" goto OPEN_INDEX
if "%choice%"=="2" goto OPEN_ALLINONE
if "%choice%"=="3" goto EDIT_NOTEPAD
if "%choice%"=="4" goto OPEN_FOLDER
if "%choice%"=="5" goto EXIT_PROG

echo Lua chon khong hop le! Vui long thu lai...
timeout /t 2 > nul
goto MENU

:OPEN_INDEX
echo.
echo Dang khoi chay trang web index.html tren trinh duyet...
start "" "index.html"
echo Da mo thanh cong!
timeout /t 3 > nul
goto MENU

:OPEN_ALLINONE
echo.
echo Dang mo ban All-In-One (website-all-in-one.html) tren trinh duyet...
start "" "website-all-in-one.html"
echo Da mo thanh cong!
timeout /t 3 > nul
goto MENU

:EDIT_NOTEPAD
echo.
echo Dang mo cac file code bang Notepad de ban chinh sua...
start notepad "website-all-in-one.html"
echo Da mo file website-all-in-one.html trong Notepad!
timeout /t 3 > nul
goto MENU

:OPEN_FOLDER
echo.
echo Dang mo thu muc chua ma nguon...
explorer .
goto MENU

:EXIT_PROG
echo.
echo Cam on ban da su dung! Hen gap lai.
timeout /t 2 > nul
exit
