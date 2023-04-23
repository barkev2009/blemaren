#!/bin/bash

cd server
echo "Installing server dependencies..."
npm i
PORT=5000 nohup node index.js &