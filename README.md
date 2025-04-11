# PDF Preservation

Uma api simples para a preserveção de arquivos pdfs.

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

### Documentação

É possível ver uma documentação dos endpoints da API do backend acessando
`http://localhost:5000/docs`.

### PgAdmin

É possível acessar o banco de dados através do PgAdmin4 pelo link:
`http://localhost:5050`.

As credenciais necessárias para isso são:

> - email: admin@admin.com
> - password: pgadmin4