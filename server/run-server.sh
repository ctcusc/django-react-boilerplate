#!/bin/bash
trap 'kill $(jobs -p)' EXIT

source venv/bin/activate
python manage.py runserver 0.0.0.0:8001
