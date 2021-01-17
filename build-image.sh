#!/bin/bash
printf "Step 1, remove old img.tar \n";
rm img.tar;
printf "Step 2, remove old docker image \n"
docker rmi nestjs-demo;
printf "Step 3, build image nestjs-demo \n"
docker build -t nestjs-demo .;
printf "Step 4, pack new image to tar \n"
docker save -o img.tar nestjs-demo;
printf "Succeed!"