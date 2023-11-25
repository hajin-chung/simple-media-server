#!/bin/bash

export PROD_PATH="/opt/sms"

# pull latest version
git pull

# copy template files
cp -r views "$PROD_PATH/"
cp -r statuc "$PROD_PATH/"

# build server binary
go build -o "$PROD_PATH/sms"

# restart server daemon
sudo systemctl restart sms
