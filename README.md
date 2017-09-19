# CTC DRP (Django React Postgres) Stack

[![Build Status](https://travis-ci.org/vmagro/django-react-starter.svg?branch=master)](https://travis-ci.org/vmagro/django-react-starter)
[![Test Coverage](https://codeclimate.com/github/vmagro/django-react-starter/badges/coverage.svg)](https://codeclimate.com/github/vmagro/django-react-starter/coverage)

## Getting Started
1. [Install Homebrew](https://brew.sh/) (If you're on Windows, I'm sorry)

1. Clone this repository
`git clone git@github.com:ctcusc/django-react-boilerplate.git`

1. `cd` into the folder and run `install.sh`

1. Start the server with `start.sh`

1. See the server live on `localhost:8000`

## Using Supervisord

## Backend
**Make sure that you are in /server if you need to run ./start.sh, the server-start script.**



- We will be building out our backend RESTful API using Django, a Python web framework
  - The link below will take you to the Django documentation for running commands in the terminal
  - [Django CLI Commands](https://docs.djangoproject.com/en/1.11/ref/django-admin/)

- Top-level routes are located under `/server/server/urls.py` and `/server/server/views.py`
- The routes that you will be working with are located under `/server/social_network/urls.py` and `/server/social_network/views.py`

- Database models are located under `/server/social_network/models.py`
  - Currently limited to Profiles, Posts, and Votes
  - Serializers to convert instances of these models to JSON are located under `/server/social_network/serializers.py`
