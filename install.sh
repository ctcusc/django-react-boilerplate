#!/bin/sh

if [ -n "`$SHELL -c 'echo $ZSH_VERSION'`" ]; then
  PROFILE="$HOME/.zsh_profile"
elif [ -n "`$SHELL -c 'echo $BASH_VERSION'`" ]; then
  PROFILE="$HOME/.bash_profile"
fi

brew install nginx python3 yarn

# ============= INSTALL NVM AND NODE ============= #
# NOTE: `brew uninstall node` if you already have it installed
brew install nvm
echo '' >> $PROFILE
echo 'export NVM_DIR="$HOME/.nvm"' >> $PROFILE
echo '. "$(brew --prefix nvm)/nvm.sh"' >> $PROFILE

source $PROFILE
nvm install lts/*
nvm alias default lts/*

# ============= INSTALL SUPERVISOR ============= #
brew install python
if hash pip 2>/dev/null
then
  echo "pip already installed!"
else
  sudo easy_install pip
fi
if supervisord --version | grep 3.3.3 >/dev/null 2>&1
then
echo supervisord 3.3.3 already installed
else
sudo pip install supervisor
fi

# ============= SETUP SERVER ============= #
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
