cd $PWD/installScript

mongoc=mongo-c-driver-1.6.2
if [ ! -f ${mongoc}.tar.gz ]
then
wget https://github.com/mongodb/mongo-c-driver/releases/download/1.6.2/${mongoc}.tar.gz
fi

if [ -f ${mongoc}.tar.gz ]
then
tar xzf ${mongoc}.tar.gz && mv ${mongoc} mongoc
cd mongoc
./configure --disable-automatic-init-and-cleanup
make -j4
sudo make install
cd ..
rm ${mongoc}
fi

cd $PWD
