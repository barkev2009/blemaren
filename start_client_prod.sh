#!/bin/bash

cd client
npm run build
nohup serve -s build &