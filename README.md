# 🚀 Teste MXLog - Frontend

Aplicação frontend desenvolvida em React para gerenciamento de usuários, consumindo uma API ASP.NET Core.

---

## 📸 Preview

Sistema com:

- 🔐 Login
- 📊 Dashboard de usuários (paginado)
- ➕ Cadastro de usuário
- ✏️ Edição de usuário
- 🗑️ Exclusão de usuário
- 🔒 Rotas protegidas

---

## 🧱 Tecnologias utilizadas

- ⚛️ React
- ⚡ Vite
- 🧭 React Router DOM
- 📡 Axios
- 📋 React Hook Form
- 🎨 Bootstrap

---

## 📁 Estrutura do projeto

```
src/
├── features/
│ ├── auth/
│ └── users/
├── shared/
├── routes/
└── app/
```

---

## ⚙️ Configuração do ambiente

### 1. Clonar o projeto

```bash
git clone https://github.com/gfernandes728/teste-mxlog-gustavo.git
cd teste-mxlog-gustavo
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

#### Crie um arquivo .env na raiz:

```bash
VITE_API_URL=https://localhost:7182
```

### 4. Rodar o projeto

```bash
npm run dev
```

### 5. A aplicação estará disponível em:

```
http://localhost:5173/
```

## 🔗 Integração com API

### A aplicação consome endpoints da API ASP.NET Core:

```
- POST /auth/login
- GET /users/dashboard
- GET /users/{id}
- POST /users
- PUT /users/{id}
- DELETE /users/{id}
```

## 🔐 Autenticação

```
- Token JWT armazenado no localStorage
- Interceptor adiciona automaticamente o Authorization: Bearer
- Rotas protegidas com PrivateRoute
```

## 🧠 Regras de negócio

```
❌ Usuário principal não pode ser excluído
✔ Paginação de usuários
✔ Formulário reutilizado para criação e edição
```

## ⚠️ Tratamento de erros

```
Erros da API são exibidos para o usuário
```

## 👤 Autor

**Gustavo Fernandes**  
📧 guga.728@gmail.com  