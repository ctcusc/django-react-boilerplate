#!/bin/bash
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

source venv/bin/activate
python manage.py runserver 0.0.0.0:8001
