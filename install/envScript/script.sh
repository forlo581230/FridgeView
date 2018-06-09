#!/usr/bin/xdotoool
scriptpath=$(pwd)
### Split Tmux Pane
if [[ $1 = "build" ]]
then
xdotool sleep 1 key alt+1
xdotool type "cd ~" 
xdotool key KP_Enter
xdotool type "clear" 
xdotool key KP_Enter
xdotool sleep 1 type "tmux"
xdotool sleep 1 key KP_Enter
xdotool sleep 3 key ctrl+c

xdotool key ctrl+b
xdotool key shift+apostrophe
xdotool key ctrl+b
xdotool key shift+apostrophe

xdotool key ctrl+b
xdotool key q
xdotool key 1

xdotool key ctrl+b
xdotool key shift+5

xdotool key ctrl+b
xdotool key q
xdotool key 2

xdotool key ctrl+b
xdotool key shift+apostrophe

xdotool key ctrl+b
xdotool key q
xdotool key 4

xdotool key ctrl+b
xdotool key shift+5

xdotool key ctrl+b
xdotool key colon
xdotool type "resize-pane -t 0 -y 10"
xdotool key KP_Enter

xdotool key ctrl+b
xdotool key colon
xdotool type "resize-pane -t 4 -y 10"
xdotool key KP_Enter

xdotool key ctrl+b
xdotool key colon
xdotool type "resize-pane -t 2 -x 45"
xdotool key KP_Enter

#xdotool key shift+5
#xdotool key shift+apostrophe

bash ${scriptpath}/envScript/envScript.sh $2
xdotool key alt+2
elif [[ $1 = "kill" ]]
then
echo "kill"
xdotool key alt+1
for i in 0 1 2 3 4 5
do
xdotool key ctrl+b
xdotool key q
xdotool key $i
xdotool key ctrl+c
done

xdotool key ctrl+b
xdotool key d
xdotool type "tmux kill-server"
xdotool key KP_Enter
xdotool key alt+2
elif [[ $1 = "restart" ]]
then
echo "restart"

fi
