#!/bin/bash

cd server
echo "Installing server dependencies..."
npm i
nohup PORT=5000 node index.js &