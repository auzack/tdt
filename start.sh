#!/bin/bash
date=$(date +%Y%m%d-%H%M%S)
mkdir $date
forever start -a -l forever.log -o $date/out.log -e $date/err.log bin/www