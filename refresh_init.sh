cd ./archivematica/hack || { echo "'./archivematica/hack' directory doesn't exists."; exit 1; }

make create-volumes

make build

docker compose up -d

make bootstrap

make restart-am-services

cd ../..