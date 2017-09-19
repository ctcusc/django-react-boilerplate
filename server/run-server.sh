#!/bin/sh

# activate the virtualenv before we start the server
pushd $(pipenv --venv)/bin
source activate
popd

# use exec so that the shell process is replaced by the django server process
exec python manage.py runserver 0.0.0.0:8001
