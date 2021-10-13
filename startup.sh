#!/bin/sh
rc-status
cd /etc/ssh
ssh-keygen -A


cd /usr/sbin/
rc-update add sshd
rc-service sshd start

cd /usr/app/client
npm install
npm run-script build


cd /usr/app
npm start