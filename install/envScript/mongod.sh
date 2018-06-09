#!/bin/sh

USER=teco-iaq
DbPath=/home/$USER/MongoDB
cmd="mongod --fork --journal --logpath /var/log/mongodb/mongod.log --dbpath=$DbPath"
eval "$cmd"
