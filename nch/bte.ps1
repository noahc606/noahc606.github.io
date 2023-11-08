$ProgressPreference = 'SilentlyContinue'

Invoke-WebRequest https://github.com/noahc606/Back-to-Earth/archive/main.zip -o BTE.zip
Expand-Archive .\BTE.zip
Move-Item .\BTE\Back-to-Earth-main\bin\backtoearth .\
Move-Item .\BTE\Back-to-Earth-main\bin\Back-to-Earth-windows.exe .\
Move-Item .\BTE\Back-to-Earth-main\bin\Back-to-Earth-unix .\
Move-Item .\BTE\Back-to-Earth-main\bin\SDL2.dll .\
Move-Item .\BTE\Back-to-Earth-main\bin\SDL2_image.dll .\
Move-Item .\BTE\Back-to-Earth-main\bin\SDL2_mixer.dll .\
Move-Item .\BTE\Back-to-Earth-main\bin\SDL2_ttf.dll .\
Move-Item .\BTE\Back-to-Earth-main\bin\ .\



Remove-Item .\BTE -R
Remove-Item .\BTE.zip -R

$ProgressPreference = 'Continue'