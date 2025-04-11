cd ./archivematica/hack || { echo "'./archivematica/hack' directory doesn't exists."; exit 1; }

docker compose up -d

cd ../..

docker compose up -d