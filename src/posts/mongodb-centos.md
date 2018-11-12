---
title: 'Change MongoDB data directory in CentOS 7'
date: 2018-11-12
excerpt: "It might seem simple to change the MongoDB data directory: just adjust the _*/etc/mongod.conf*_ file and that’s it.
But it won’t work and here’s where you can meet the SELinux contexts..."
---
It might seem simple to change the MongoDB data directory: just adjust the _*/etc/mongod.conf*_ file and that’s it.
But it won’t work and here’s where you can meet the SELinux contexts.

Let’s do it step by step:

1. Stop the service:
```bash
service mongod stop
```
2. Move old DB data directory to a new place (we’ll use _*/mnt/mongo*_ as a new path):
```bash
mv /var/lib/mongo/ /mnt/
```
3. Edit the configuration file:
```bash
vim /etc/mongod.conf
```
Replace _*/var/lib/mongo*_ with the new path _*/mnt/mongo*_
```
...
# Where and how to store data.
storage:
  dbPath: /mnt/mongo
...
```
4. Change new directory owner:
```bash
chown -R mongod:mongod /mnt/mongo/
```
5. Change SELinux for the new data directory
```bash
chcon -Rv --type mongod_var_lib_t /mnt/mongo/
```
6. Start service again
```bash
service mongod start
```
