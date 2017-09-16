#!/bin/sh

# activate the virtualenv before we start the server
source venv/bin/activate

# use exec so that the shell process is replaced by the django server process
exec python manage.py runserver 0.0.0.0:8001
