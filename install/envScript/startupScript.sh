mongodScript=$PWD/envScript/mongod.sh
mqttScript=$PWD/envScript/mqtt.sh

sudo sed -i -e '$i sh "'$mongodScript'"' /etc/rc.local
sudo sed -i -e '$i sh "'$mqttScript'"' /etc/rc.local



