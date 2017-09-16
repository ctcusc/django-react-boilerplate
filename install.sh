#!/bin/bash

set -e;

brew install supervisord nginx python3 node yarn

# setup server
pushd server/

# create a virtualenv and install the packages
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

popd
# end server

# setup the client
pushd client/
yarn install

popd
# end client

# these directories are needed by supervisord
mkdir tmp
mkdir logs
