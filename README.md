# Phone List

Este é um projeto Node.js que utiliza o framework Express para criar uma aplicação de lista de telefones.

## Padrões e Arquitetura

### Arquitetura MVC + Services
- **Models**: Schemas e definições de dados usando Mongoose
- **Controllers**: Manipulação de requisições HTTP e respostas
- **Services**: 
  - Validações
  - Integrações externas
  - Transformação de dados

### Tecnologias Relevantes
- Node.js com Express
- MongoDB com Mongoose
- Integração com HGBrasil Weather API

## Instalação e preparação

Clone o repositório e instale as dependências:

```sh
git clone https://github.com/JLucas5/phone-list.git
cd phone-list
npm install
```
## Variáveis de Ambiente

O projeto requer um arquivo `.env` na raiz com as seguintes variáveis:

```env
# MongoDB (Caso ausente irá padronizar para 'mongodb://127.0.0.1:27017/'
MONGO_URI=sua_string_de_conexao_do_mongo

# API de Clima (HG Brasil)
WEATHER_API_KEY=sua_chave_api_aqui

# Servidor (Caso ausente irá padronizar para 3000)
PORT=sua_porta_de_preferencia
```

## Uso

Para iniciar o projeto, execute:

```sh
npm run dev
```
Para executar o projeto em modo de desenvolvimento

OU

```sh
node index.js
```
Para executar o projeto em modo de produção

## Detalhes da API

A API possui quatro endpoints principais:

### Criar Contato
- **Endpoint**: `POST /contacts/create`

Esse endpoint espera os dados de um novo contato no body da requisição, seguindo a seguinte estrutura:
(Todos os dados são obrigatórios)
- **Body**:
  ```json
  {
    "name": "string",
    "phone": ["string"],
    "address": "string",
    "email": "string"
  }
  ```
- **Resposta de Sucesso** (201):
  ```json
  {
    "id": "string",
    "name": "string",
    "phone": ["string"],
    "address": "string",
    "email": "string",
    "isActive": true
  }
  ```
- **Resposta de Erro** (400):
  ```json
  {
    "message": "Error creating contact",
    "error": "string"
  }
  ```

### Buscar Contatos
- **Endpoint**: `GET /contacts/search`
Esse endpoint espera os dados de filtragem do contato como parâmetros da query na seguinte estrutura:
(Parâmetros ausentes na query não serão usados para filtragem)
- **Query Parameters**:
  - `name`: string (opcional)
  - `phone`: string (opcional)
  - `email`: string (opcional)
  - `address`: string (opcional)
- **Resposta de Sucesso** (200):
  ```json
  {
    "contacts": [
      {
        "id": "string",
        "name": "string",
        "phone": ["string"],
        "address": "string",
        "email": "string",
        "isActive": true,
        "weather": {
          "temperature": "number",
          "condition": "string",
          "message": "string"
        }
      }
    ]
  }
  ```

  ### Atualizar Contato
- **Endpoint**: `PUT /api/contacts/update/:id`
  Esse endpoint espera um id como parâmetro da requisição juntamente dos dados do contato no body da mesma.
  Dados não enviados não serão atualizados.
- **Parameters**:
  - `id`: MongoDB ObjectId
- **Body**:
  ```json
  {
    "name": "string",
    "phone": ["string"],
    "address": "string",
    "email": "string"
  }
  ```
- **Resposta de Sucesso** (200):
  ```json
  {
    "id": "string",
    "name": "string",
    "phone": ["string"],
    "address": "string",
    "email": "string",
    "isActive": true
  }
  ```
- **Resposta de Erro** (404):
  ```json
  {
    "message": "Contact not found"
  }
  ```

  ### Deletar Contato (Deleção Lógica)
  Esse endpoint espera o id do objeto no banco de dados como parÂmetro da query.
- **Endpoint**: `DELETE /api/contacts/delete/:id`
- **Parameters**:
  - `id`: MongoDB ObjectId
- **Resposta de Sucesso** (204): 
```json
{
  "message": "Contact deleted successfully",
  "contact":  {
    "id": "string",
    "name": "string",
    "phone": ["string"],
    "address": "string",
    "email": "string",
    "isActive": false
  }
}
```
- **Resposta de Erro** (404):
  ```json
  {
    "message": "Contact not found"
  }
  ```

## Dependências

- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Mongoose](https://mongoosejs.com/)

### Desenvolvimento
- [Nodemon](https://nodemon.io/)

## Melhorias possíveis

- A arquitetura MVC + Services não está sendo seguida por completo. Os Controllers ainda possuem competências que deverias ser repassadas aos Serviços, como acesso a Banco de Dados.
