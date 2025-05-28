# Sistema de Pedidos com Microsserviços

Este projeto é uma aplicação backend modular para gestão de pedidos, desenvolvida com NestJS e comunicação assíncrona entre microsserviços via Kafka. O sistema utiliza MongoDB para armazenamento de dados e Docker Compose para orquestração dos containers, incluindo Zookeeper e Kafka.

O objetivo é construir uma solução escalável e eficiente, que facilite a integração entre diferentes módulos como autenticação, produtos, usuários e pedidos, utilizando boas práticas de arquitetura e desenvolvimento ágil.

---

## Tecnologias Utilizadas

- **NestJS** — Framework Node.js para construção de aplicações escaláveis
- **MongoDB** — Banco de dados NoSQL
- **Kafka** — Mensageria para comunicação entre microsserviços
- **Docker & Docker Compose** — Orquestração de containers
- **JWT (JSON Web Token)** — Autenticação
- **TypeScript** — Tipagem estática para JavaScript

## Estrutura do Projeto

- `auth/` → Serviço de autenticação
- `users/` → Gerenciamento de usuários
- `products/` → Controle de produtos e estoque
- `orders/` → Processamento de pedidos



## Começando

### Pré-requisitos

- Node.js (versão recomendada: 18+)
- Docker e Docker Compose instalados
- MongoDB, Kafka e Zookeeper rodando via Docker Compose (configuração já incluída no projeto)

### Clonando o repositório

```bash
git clone https://github.com/Aegdae/order-list.git
cd order-list
```

### Instalando dependências

```bash
npm install
```

### Rodando os serviços com Docker Compose

Para facilitar a inicialização dos serviços externos necessários, como MongoDB, Kafka e Zookeeper, utilizamos Docker Compose.

```bash
docker-compose up -d
```

### Rodando a aplicação NestJS


```bash
npm run start:dev
```

## Endpoints
### Usuários (Users)
`POST /users/register` — Registra um novo usuário
Corpo: 
```json
  {
    "name": "João",
    "email": "joao@email.com",
    "password": "senha123"
  }
```
`GET /users` — Retorna todos usuários (com endereços e pedidos populados)

`GET /users/:email` — Retorna um usuário pelo email

`PATCH /users/:id` — Atualiza usuário pelo ID

`DELETE /users/:id` — Remove usuário pelo ID

### Produtos (Products)
`POST /products/register` — Cria um novo produto
Corpo:
```json
 { 
    "name": "Mouse", 
    "description": "Mouse gamer", 
    "stock": 10,
 }
```

`GET /products` — Lista todos produtos

`GET /products/:id` — Busca produto pelo ID

`PATCH /products/:id` — Atualiza produto pelo ID

`PATCH /products/update-stock/:id` — Atualiza estoque do produto
Corpo: { stock: number }

`DELETE /products/:id` — Remove produto pelo ID

### Pedidos (Orders)
`POST /orders/send-order` — Envia um novo pedido
Corpo:
```json
{ 
    "userId": "<ID do usuário já existente>", 
    "productId": "<ID do produto já existente>", 
    "quantity": 2,
}
```
Valida o estoque antes de criar o pedido.

`GET /orders` — Lista todos os pedidos

`GET /orders/:id` — Busca pedido pelo ID

### Autenticação (Auth)
`POST /auth/login` — Autentica usuário e retorna token JWT
Corpo:
```json
 { 
    "email": "joao@email.com", 
    "password": "senha123" 
 }
```

### Eventos Kafka Consumidos

- **order-created** — Evento consumido pelos microserviços **Users** e **Products**.  
  - No serviço **Users**, o evento adiciona o pedido ao histórico do usuário.
  - No serviço **Products**, o evento reduz a quantidade em estoque do produto comprado.

## Notas
Os serviços dependem do Kafka, Zookeeper e MongoDB rodando, por isso é recomendada a utilização do Docker Compose para orquestrar estes serviços auxiliares.

A API está dividida em microserviços desacoplados e se comunicando via Kafka para garantir escalabilidade e manutenção facilitada.

Atualmente, o frontend da aplicação está em desenvolvimento.

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).