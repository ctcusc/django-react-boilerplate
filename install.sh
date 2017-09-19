#!/bin/sh

if [ -n "`$SHELL -c 'echo $ZSH_VERSION'`" ]; then
  PROFILE="$HOME/.zsh_profile"
elif [ -n "`$SHELL -c 'echo $BASH_VERSION'`" ]; then
  PROFILE="$HOME/.bash_profile"
fi

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
nvm use lts/*

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

pip install pipenv
pipenv install -r requirements.txt

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
