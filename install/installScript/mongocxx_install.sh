cd $PWD/installScript

mongocxx=r3.1.1
sudo apt-get install cmake -y
cmake=$(cmake --version | grep version | awk '{print $3}')
if [[ ${cmake} != "3"* ]];
then
source cmake_install.sh
fi

if [ ! -f mongo-cxx-driver-${mongocxx}.zip ]
then
wget https://github.com/mongodb/mongo-cxx-driver/archive/${mongocxx}.zip -O mongo-cxx-driver-${mongocxx}.zip
fi

if [ -f mongo-cxx-driver-${mongocxx}.zip ]
then
unzip mongo-cxx-driver-${mongocxx}.zip && mv mongo-cxx-driver-${mongocxx} mongocxx
cd mongocxx/build
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local ..
sudo make EP_mnmlstc_core
make -j4
sudo make install
cd ../../
fi

cd $PWD
