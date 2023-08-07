
# ContactKA 👥

ContactKA-server é uma api desenvolvida para salvar seus contatos. 

## Principais tecnologias utilizadas: 

- ####  Express
- ####  typeORM
- ####  postgreSQL
- ####  Zod

## Instalação

Utilize npm 

1. Clone este repositório em sua máquina;

2. Acesse o repositório clonado através de um terminal, pode ser o terminal integrado do vsCode ou o terminal do seu computador;

3. Digite o seguinte comando no terminal **`npm install`**, isso fará com que todas as dependências do projeto sejam instaladas;

4. Após todas as depêndencias instaladas, crie um novo banco de dados, utilizando o PostgreSQL; 

5. Abra o arquivo **`.env.example`**, ele contém a baseURL necessário para conectarmos o servidor ao banco;

6. Crie um arquivo **`.env`** substituindo as informações do **`.env.example`**, pelas suas informações de conexão; 

7. Após criação do banco e conexão feitas, execute o comando **`npm run typeorm migration:run -- -d ./src/data-source.ts`**, para criar as tabelas no seu banco de dados a partir da pasta `migrations`;

8. Em seguida, execute o comando **`npm run dev`** no terminal do projeto para rodar o servidor.

9. A aplicação também consta com testes de rotas, para executar, basta rodar o comando **`npm run test`**

## Visualização 

Com o servidor rodando, clique no link abaixo para visualizar as funcionalidades do ContactKA. 

### [ContactKA](https://contact-ntxpqrr9w-carlazola.vercel.app)

### O link do reposótio com o Frontend, você tem aqui 👇
### [ContactKA - Frontend](https://github.com/CarlaZola/contactKA) 

_Obs: Caso ao atualizar uma página e obtiver erro de redirecionamento. Desative as extensões do navegador_
