all:
	@echo "nothing to do"

install:
	@echo "Ready to Install Librarys"
	bash installScript/node_install.sh
	bash installScript/mongodb_install.sh
	@echo "Librarys Installed End"

install-ide:
	@echo "Ready to Install IDE"
	bash installScript/ide_install.sh
	bash installScript/env_install.sh
	@echo "IDE Installed End"

startup:
	@echo "Set Up Startup Script"
	bash envScript/startupScript.sh	
	@echo "Set Up End"

build:
	@echo "Ready to Setting Env"
	bash envScript/script.sh build dev
	@echo "Env Setting End"

run:
	@echo "Ready to Run"
	bash envScript/script.sh build 
	@echo "Env Setting End"

kill:
	@echo "Kill Env"
	bash envScript/script.sh kill
	@echo "Killed End"
