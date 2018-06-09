cmake=cmake-3.4.1
if [ ! -f ${cmake}.tar.gz ]
then
wget http://www.cmake.org/files/v3.4/${cmake}.tar.gz
fi

if [  -f ${cmake}.tar.gz ]
then
tar -xvzf ${cmake}.tar.gz
cd ${cmake}
./configure
make
sudo make install
sudo update-alternatives --install /usr/bin/cmake cmake /usr/local/bin/cmake 1 --force
fi
