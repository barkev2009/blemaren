#!/bin/bash

cd server
echo "Installing server dependencies..."
npm i
nohup node index.js &