cd $PWD/installScript

set -e
sudo apt-get update
sudo apt-get install build-essential

# install node library
node=9.11.1
if [ ! -f node-${node}.zip ]
then
wget https://github.com/nodejs/node/archive/v${node}.zip -O node-${node}.zip
fi

if [ -f node-${node}.zip ]
then
unzip node-${node}.zip
cd node-${node}
./configure
make -j4
make test
make doc
./node -e "console.log('Hello from Node.js ' + process.version)"
sudo make install
cd ..
rm -rf node-${node}
fi

cd $PWD
