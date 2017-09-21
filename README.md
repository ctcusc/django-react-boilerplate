# CTC DRP (Django React Postgres) Stack

[![Build Status](https://travis-ci.org/vmagro/django-react-starter.svg?branch=master)](https://travis-ci.org/vmagro/django-react-starter)
[![Test Coverage](https://codeclimate.com/github/vmagro/django-react-starter/badges/coverage.svg)](https://codeclimate.com/github/vmagro/django-react-starter/coverage)

## Getting Started
1. [Install Homebrew](https://brew.sh/) (If you're on Windows, I'm sorry)

1. Clone this repository
`git clone git@github.com:ctcusc/django-react-boilerplate.git`

1. `cd` into the folder and run `./install.sh`

1. Start the server with `./start.sh`

1. See the server live on `localhost:8000`

1. Run `tail -f django` to see the Django logs or `tail -f webpack` to see the Webpack logs

## Using Supervisord
Supervisord allows us to run and "supervise" multiple processes at the same time. This is essential as we need to run both a Django and Webpack (Frontend) server, along with nginx to proxy them.

`start.sh` should put you in the Supervisor Control Panel, but if you ever accidentally exit the CLI, running `supervisorctl` should put you back in.

**NOTE: If you exit the Supervisor Control Panel, it will still be running on your computer. You need to actually shutdown your control panel in order to shut the server off**

### Supervisor Control Panel
You can run the following commands on current processes:

- `status` will list the status of all the processes (State, Running Time, Process ID)
- `start <name or all>` will start a given process (or all if you type `all`)
- `stop <name or all>` will stop a given process (or all)
- `restart <name or all>` will restart a given process
- `shutdown` will shutdown the entire supervisord process **(YOU NEED TO DO THIS TO QUIT THE SERVER)**
- `tail -f <name>` will show you the live logs of a given process
- `tail -100 <name>` will show you the last 100 bytes of a given process (100 can be any number)


If you want to see the full logs of a process, go to `/logs/` and look for the log of the process you want to examine.

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

## Frontend
### Dependency Management
We are using Yarn, Facebook's proprietary package managing tool. We are using it in place of NPM because it has better support for versionining and dependency control.

**NOTE: DO NOT RUN npm install**

- `yarn install`: installs all dependencies in the `package.json` file
- `yarn add <package-name>`: installs the given package and adds it to the yarn.lock file
- `yarn list`: lists all of the installed packages
- `yarn remove <package-name>`: removes the package from your node_modules and also your yarn.lock file.
- Documentation: https://yarnpkg.com/en/docs/cli/

### Folder Structure
All of our frontend files are located in the `/client` folder. This folder also contains the yarn.lock file and package.json, so perform all node package management in this directory.

We will be using **CSS modules** for our styling. All **GLOBAL** styles should be kept under the `/styles` folder.

Our app is separated into "domains" with the following folder structure: 
    - Dumb Components live in `<domain-name>/components`
    - Smart Containers live in `<domain-name>/scenes`
    - Reducers & Actions live in `<domain-name>/`
    
