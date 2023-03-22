#!/bin/bash

cd client
echo "Installing client dependencies..."
npm i
npm run build
nohup serve -s build &