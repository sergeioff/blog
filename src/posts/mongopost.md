---
title: 'Change me '
date: 2018-03-18
excerpt: 'excerpt text'
---
# Change MongoDB data directory in CentOS 7

It might seem simple to change the MongoDB data directory: just adjust the _/etc/mongod.conf_ file and that's it.
But here's where you can meet the SELinux contexts.

Let's do it step by step:
1. Stop the service:
```bash
service mongod stop
```
2. Move old DB data directory to a new place (we'll use _/mnt/mongo_ as a new path):
```bash
mv /var/lib/mongo/ /mnt/
```

3. Edit the configuration file:
```bash
vim /etc/mongod.conf
```
Replace _/var/lib/mongo_ with the new path _/mnt/mongo_
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
