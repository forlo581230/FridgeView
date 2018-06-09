cd $PWD/installScript

# install mongodb
set -e
release=$(lsb_release -a | grep Release)
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
if [[ $release == *"16"* ]]
then
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
elif [[ $release == *"14"* ]]
then
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
fi

sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod stop

cd $PWD
