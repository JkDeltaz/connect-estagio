# ConnectEstágio

ConnectEstágio é uma aplicação de estágio web que conecta estudantes a empresas, com painel de empresa, cadastro de vagas e sistema de candidaturas.

## Visão geral do projeto

- Frontend: React + Vite
- Backend: Node.js + Express
- Banco de dados: MySQL
- Esta aplicação inclui autenticação de estudantes e empresas, criação/edição de vagas, perfil de empresa, e listagem de candidaturas.

## Estrutura do projeto

- `src/` - código frontend React
- `server.js` - backend Express
- `database.sql` - esquema e dados iniciais do banco
- `package.json` - dependências e scripts

## Dependências principais

- `react`, `react-dom`
- `vite`
- `express`
- `mysql2`
- `cors`
- `dotenv`

## Configuração do banco de dados

1. Instale e inicie o MySQL.
2. Crie o banco com o arquivo `database.sql`:

```bash
mysql -u root -p connectestagio < database.sql
```

3. Se quiser usar outras credenciais ou um host diferente, crie um arquivo `.env` na raiz com:

```ini
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=connectestagio
```

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o backend:

```bash
npm run start:backend
```

3. Inicie o frontend:

```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`.

> O backend roda por padrão em `http://localhost:4000`.

## Login de exemplo

- Estudante:
  - Email: `estudante@exemplo.com`
  - Senha: `123456`
- Empresa:
  - Email: `empresa@exemplo.com`
  - Senha: `123456`

## Observações

- Se o backend não conseguir se conectar ao banco, verifique as variáveis de ambiente e a instalação do MySQL.
- O arquivo `database.sql` já contém a criação das tabelas e dados iniciais para testes.
  