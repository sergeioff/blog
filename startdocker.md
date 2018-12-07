docker build -t myblog .
docker run --name myblog-image -p 80:80 -d myblog
