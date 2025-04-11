# Backend - PDF preservation

Backend desenvolvido utilizando <a href="https://nestjs.com/">NestJs</a> e <a href="https://www.prisma.io/">Prisma</a>.



## Primeira Inicialização

Na primeira inicialização o arquivo `Dockerfile` deve ter o comando:

> CMD ["npm", "run", "start:prod"]

Substituído por:

> CMD ["npm", "run", "start:migrate:prod"]

Para que o Prisma crie as tabelas necessárias no SGBD.

Também é necessário criar o arquivo `.env` com as informações:

````
ARCHIVE__KEY="test"
ARCHIVE__USER="test"

DATABASE_URL="postgresql://postgres:123456789@${DB_HOST}:5432/postgres?schema=public"
SALT=10
SECRET=236a0bd6fe2c156bd0a9afb38b6b382b4b0beb3bda61c68777e615c788fb22e7a73e5bcf6fee94cf605cd957a18def9606defa96945b73fd7d64209a64f5cb0b2d37fe1b70ea216d48e992fdd7fcd4b37c27571f3e49b3dd843987ce5b21774298a4125e8ba6ab7d642f7f7e2e64c5e5c2544074cad97d9644d82e292e04cc0523d0f5a942a1610dc11d9218651e9a24b1ec1c74919428f3cf9d7b13b92df798a983a30caf0e7a5f165f83d48ab76a197fd872e8e49bf7396631eddbaeefb5d8930b49f9eeb820cdc929576c730a255bd83069e2834bddf57cfa88ee6b4ad29daffa7a00056fce66dc28e534a59c5be5e7a68b791862d4b4a1058af29c7f7c54
````

**OBS: Não use esse secret em produção**

## Documentação

É possível ver uma documentação dos endpoints no endereço:

> http://localhost:5000/docs

## PgAdmin

É possível acessar o PgAdmin4 para administrar o banco de dados pelo endereço:

> http://localhost:5050