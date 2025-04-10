# PDF Preservation

Uma api simples para a preserveção de arquivos pdfs.

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