@ECHO OFF

ECHO build time is approximated in 20m.

git clone https://github.com/artefactual/archivematica.git --branch qa/1.x --recurse-submodules

cd ./archivematica/hack || { echo "'./archivematica/hack' directory doesn't exists."; exit 1; }

make create-volumes

make build

ECHO initiating docker

docker compose up -d

ECHO building database structure

make bootstrap

ECHO restarting archivematica services

make restart-am-services

