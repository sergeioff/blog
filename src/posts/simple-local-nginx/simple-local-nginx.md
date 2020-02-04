---
title: 'Simple local nginx'
date: 2020-01-04
excerpt: "It's preety simple to run a local Nginx web server for test purposes...."
---
It's preety simple to run a local Nginx web server for test purposes.

First of all we need to pull the Nginx docker image

```docker pull nginx```

Then we can run. Here we can specify port forwarding with the **-p** option and mount the web directory for Nginx through the **-v** option.

```docker run --name blog-nginx -p 80:80 -v ~/Git/blog/dist/:/usr/share/nginx/html:ro -d nginx```

That's it, now we have a running Nginx that servers our content.