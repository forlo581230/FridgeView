sudo apt-get -y install tmux
sudo apt-get -y install xdotool
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
sudo apt-get -y install mosquitto mosquitto-clients
sudo npm install pm2 -g
cd $PWD
cp .tmux.conf ~
