# 🔌 Backend API

API RESTful em Node.js para o Smart Workspace.

## 🛠 Tecnologias
- **Node.js + Express**
- **Sequelize ORM** (PostgreSQL)
- **Arquitetura Modular**

## 📡 Endpoints Principais

### Organizações (`/organizations`)
- `GET /`: Listar todas
- `POST /`: Criar nova
- `PUT /:id`: Editar
- `DELETE /:id`: Remover

## 🧪 Desenvolvimento Local
Se não quiser usar Docker:

1. Instale: `npm install`
2. Configure o `.env` com seu banco de dados.
3. Rode: `npm run dev`