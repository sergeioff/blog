yarn build
docker container stop myblog-image
docker container rm myblog-image
docker build -t myblog .
docker run --name myblog-image -p 80:80 -d myblog
