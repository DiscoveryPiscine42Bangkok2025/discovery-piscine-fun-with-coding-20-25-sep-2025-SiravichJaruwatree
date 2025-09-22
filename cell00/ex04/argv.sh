#!/bin/bash
if [ $# -eq 0 ]; 
then
    echo "No arguments supplied"
elif [ $# -le 3 ]; then
    for arg in "$@"; do
        echo $arg
    done
else
    echo "Too many arguments"
fi
