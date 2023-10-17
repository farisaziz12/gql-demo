#!/bin/bash

SERVER_BASE_URL="http://localhost:4000"


# gql server
if [ "$1" == '--server' ]; then
    if [ "$(node -v)" != "v14.0.0" ]; then
        echo "Failed to start up. You need to be running node v14.0.0"
        exit 1
    fi

    echo "Starting server in local mode"
    cd ./server && yarn dev || exit
fi

# react app
if [ "$1" == '--client' ]; then
    cd ./client && APP_SERVER_BASE_URL="$SERVER_BASE_URL" yarn dev || exit
fi

