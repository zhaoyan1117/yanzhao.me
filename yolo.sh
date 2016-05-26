#!/bin/bash

WORD="yolo"

if [ ! -z "$1" ]
then
  WORD="$1"
fi

while true
do
	say $WORD
	sleep 180
done

