#!/bin/sh

if [ -n "`$SHELL -c 'echo $ZSH_VERSION'`" ]; then
  PROFILE="$HOME/.zsh_profile"
  RC="$HOME/.zshrc"
elif [ -n "`$SHELL -c 'echo $BASH_VERSION'`" ]; then
  PROFILE="$HOME/.bash_profile"
  RC="$HOME/.bashrc"
fi

echo 'source $PROFILE' >> $RC

brew install nginx python3 yarn

# ============= INSTALL NVM AND NODE ============= #
# NOTE: `brew uninstall node` if you already have it installed

if !(brew ls --versions nvm > /dev/null); then
  echo "nvm not installed"
  brew install nvm
  echo '' >> $PROFILE
  echo 'export NVM_DIR="$HOME/.nvm"' >> $PROFILE
  echo '. "$(brew --prefix nvm)/nvm.sh"' >> $PROFILE
fi

source $PROFILE
nvm install lts/*
nvm alias default lts/*

# ============= INSTALL SUPERVISOR ============= #

# Install python2 if it doesn't exist
if !(hash python 2>/dev/null); then
  brew install python
fi

if hash pip 2>/dev/null
then
  echo "pip already installed!"
else
  easy_install pip
  pip install venv
fi

if supervisord --version | grep 3.3.3 >/dev/null 2>&1
then
  echo supervisord 3.3.3 already installed
else
  pip install supervisor
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
