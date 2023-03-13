#!/bin/bash

git stash
git pull
killall node
bash start_server_prod.sh & bash start_client_prod.sh