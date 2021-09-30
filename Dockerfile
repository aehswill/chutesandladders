FROM node:alpine

WORKDIR /usr/app
COPY . .
RUN npm install

# Install OpenSSH and set the password for root to "Docker!". In this example, "apk add" is the install instruction for an Alpine Linux-based image.
RUN apk add openssh \
     && echo "root:Docker!" | chpasswd 

# Copy the sshd_config file to the /etc/ssh/ directory
COPY sshd_config /etc/ssh/

# Open port 2222 for SSH access
EXPOSE 2222 80

RUN service ssh start
EXPOSE 22
RUN /usr/sbin/sshd

CMD ["npm", "start"]