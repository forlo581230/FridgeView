cd $PWD/installScript

vscode=code_1.12.2-1494422229_amd64
wget https://vscode.cdn.azure.cn/stable/19222cdc84ce72202478ba1cec5cb557b71163de/${vscode}.deb
sudo dpkg -i ${vscode}.deb
rm ${vscode}.deb
tmux=$(tmux -V | awk '{print $2}')
if [[ ${tmux} != "2"* ]];
then
sudo apt-get update
sudo apt-get install -y python-software-properties software-properties-common
sudo add-apt-repository -y ppa:pi-rho/dev
sudo apt-get update
sudo apt-get install -y tmux=2.0-1~ppa1~t
fi

cd $PWD


