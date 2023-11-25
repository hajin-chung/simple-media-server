#!/bin/bash

export PROD_PATH="/opt/sms"

# pull latest version
git pull

# copy template files
cp -r views "$PROD_PATH/"
cp -r static "$PROD_PATH/"

# build server binary
/usr/local/go/bin/go build -o "$PROD_PATH/sms"

# restart server daemon
systemctl restart sms
