#!/bin/bash
npm start

cd /etc/ssh
ssh-keygen -A

/usr/sbin/sshd