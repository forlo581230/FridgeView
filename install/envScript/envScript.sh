#!/usr/bin/xdotoool
workdir="$PWD/../www/dataserver/"
mongopath="~/"
mongodb="MongoDB"
###Mongodb Server
xdotool key ctrl+b
xdotool key q
xdotool key 0
xdotool key ctrl+c
xdotool type "cd ${mongopath}"
xdotool key KP_Enter
xdotool type "mongod --dbpath=${mongodb}"
xdotool key KP_Enter

xdotool key ctrl+b
xdotool key q
xdotool key 2
xdotool key ctrl+c
xdotool type "cd ${workdir}"
xdotool key KP_Enter
xdotool type "node MQTT.js"
xdotool key KP_Enter

xdotool key ctrl+b
xdotool key q
xdotool key 3
xdotool key ctrl+c
xdotool type "cd ${workdir}"
xdotool key KP_Enter
xdotool type "node taccess.js"
xdotool key KP_Enter

xdotool key ctrl+b
xdotool key q
xdotool key 1
xdotool key ctrl+c
xdotool type "cd ~"
xdotool key KP_Enter
xdotool type "mongo"
xdotool key KP_Enter
xdotool sleep 1 type "use IAQ_Db"
xdotool key KP_Enter
xdotool type "show collections"
xdotool key KP_Enter

if [[ "$1" = "dev" ]] 
then
xdotool key ctrl+b
xdotool key q
xdotool key 4
xdotool key ctrl+c
xdotool type "cd ${workdir}"
xdotool key KP_Enter
xdotool type "npm run browser-sync"
xdotool key KP_Enter

xdotool key ctrl+b
xdotool key q
xdotool key 5
xdotool key ctrl+c
xdotool type "cd ${workdir}"
xdotool key KP_Enter
xdotool type "npm run watch-css"
xdotool key KP_Enter
fi

