# Backend - PDF preservation

Backend desenvolvido utilizando <a href="https://nestjs.com/">NestJs</a> e <a href="https://www.prisma.io/">Prisma</a>.



## Primeira Inicialização

Na primeira inicialização o arquivo `Dockerfile` deve ter o comando:

> CMD ["npm", "run", "start:prod"]

Substituído por:

> CMD ["npm", "run", "start:migrate:prod"]

Para que o Prisma crie as tabelas necessárias no SGBD.

## Documentação

É possível ver uma documentação dos endpoints no endereço:

> http://localhost:5000/docs

## PgAdmin

É possível acessar o PgAdmin4 para administrar o banco de dados pelo endereço:

> http://localhost:5050