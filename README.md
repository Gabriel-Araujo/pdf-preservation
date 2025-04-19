# PDF Preservation

Uma api simples para a preserveção de arquivos pdfs.

## Pontos de melhoria e problemas conhecidos

- Atualmente o front só mostra os arquivos que já foram processados. No futuro, pode ser implementado para mostrar
os transfers e ingest em progresso. 

- Devido a apenas mostrar os arquivos processados. O front demora alguns segundos para exibir arquivos enviados. Esse
tempo é resultante do tempo de processamento do archivematica.

## Pre-requisitos

É necessário baixar e instalar o Archivematica. Para isso, basta executar o arquivo .sh:
> archivematica_install.sh

**OBS: O [Archivematica](https://www.archivematica.org/pt-br/) só funciona no linux. Portanto os comandos só irão funcionar no Linux ou no WSL.**

Ou  executar os seguintes comandos no diretório ráiz:
    
1.
    ```shell
    git clone https://github.com/artefactual/archivematica.git --branch qa/1.x --recurse-submodules
    ```
2.
   ```shell
   cd ./archivematica/hack
   ```
3.
   ````shell
   make create-volumes
   ````
4.
   ````shell
   make build
   ````
5.
   ````shell
   docker compose up -d
   ````
6.
   ````shell
   make bootstrap
   ````
7.
    ````shell
    make restart-am-services
    ````
---

Após a instalação e configuração inicial do Archivematica você pode executar o seguinte comando para reconstruir e reconfigurar os containers:
```shell
./refresh_init.sh
```

O seguinte comando inicia os containers do archivematica, do backend e do frontend:
````shell
./init.sh
````
**OBS: Antes de fazer a primeira inicialização leia a seção [Primeira Inicialização](#primeira-inicialização) do backend.**

## Archivematica

Se a instalação e configuração do Archivematica for concluída com sucesso, será possível
acessar suas interfaces pelos endereços:

> - Dashboard: http://127.0.0.1:62080/
> - Storage Service: http://127.0.0.1:62081/

As credenciais são:

- username: test
- password: test

**OBS: As interfaces só ficarão acessíveis enquanto os containers do `Archivematica` estiverem online.**
## Backend

### Primeira inicialização

Na primeira inicialização o comando no arquivo `Dockerfile` do backend
deve ser o `start:migrate:prod` para que o Prisma possa criar as tabelas.

Depois, o comando `start:migrate:prod` deve ser alterado para `start:prod`.


#### .env
Também é necessário criar o arquivo `.env` dentro do diretório do backend com as informações:

No docker o .env deve estar dessa maneira:
````
ARCHIVE__KEY="test"
ARCHIVE__USER="test"
ARCHIVE__PATH="/../var/archivematica/archivematica/users"

DASHBOARD_URL="http://172.18.0.1:62080"
STORAGE_URL="http://172.18.0.1:62081"

DATABASE_URL="postgresql://postgres:123456789@${DB_HOST}:5432/postgres?schema=public"
SALT=10
SECRET=236a0bd6fe2c156bd0a9afb38b6b382b4b0beb3bda61c68777e615c788fb22e7a73e5bcf6fee94cf605cd957a18def9606defa96945b73fd7d64209a64f5cb0b2d37fe1b70ea216d48e992fdd7fcd4b37c27571f3e49b3dd843987ce5b21774298a4125e8ba6ab7d642f7f7e2e64c5e5c2544074cad97d9644d82e292e04cc0523d0f5a942a1610dc11d9218651e9a24b1ec1c74919428f3cf9d7b13b92df798a983a30caf0e7a5f165f83d48ab76a197fd872e8e49bf7396631eddbaeefb5d8930b49f9eeb820cdc929576c730a255bd83069e2834bddf57cfa88ee6b4ad29daffa7a00056fce66dc28e534a59c5be5e7a68b791862d4b4a1058af29c7f7c54
````

Fora do docker o .env deve estar dessa maneira:
```
ARCHIVE__KEY="test"
ARCHIVE__USER="test"
ARCHIVE__PATH="/../var/archivematica/archivematica/users"

DASHBOARD_URL="http://localhost:62080"
STORAGE_URL="http://localhost:62081"

DATABASE_URL="postgresql://postgres:123456789@$localhost:5432/postgres?schema=public"
SALT=10
SECRET=236a0bd6fe2c156bd0a9afb38b6b382b4b0beb3bda61c68777e615c788fb22e7a73e5bcf6fee94cf605cd957a18def9606defa96945b73fd7d64209a64f5cb0b2d37fe1b70ea216d48e992fdd7fcd4b37c27571f3e49b3dd843987ce5b21774298a4125e8ba6ab7d642f7f7e2e64c5e5c2544074cad97d9644d82e292e04cc0523d0f5a942a1610dc11d9218651e9a24b1ec1c74919428f3cf9d7b13b92df798a983a30caf0e7a5f165f83d48ab76a197fd872e8e49bf7396631eddbaeefb5d8930b49f9eeb820cdc929576c730a255bd83069e2834bddf57cfa88ee6b4ad29daffa7a00056fce66dc28e534a59c5be5e7a68b791862d4b4a1058af29c7f7c54

```
**OBS: Não use esse secret em produção**


### Documentação

É possível ver uma documentação dos endpoints da API do backend acessando
`http://localhost:5000/docs`.

### PgAdmin

É possível acessar o banco de dados através do PgAdmin4 pelo link:
`http://localhost:5050`.

As credenciais necessárias para isso são:

> - email: admin@admin.com
> - password: pgadmin4


## Frontend

### Arquivo .env
Na raíz do diretório `frontend` é necessário criar o arquivo .env contendo:

````
BACKEND_HOST="${BACK_HOST}"
ROOT_HOST="http://${BACK_HOST}:5000"
````