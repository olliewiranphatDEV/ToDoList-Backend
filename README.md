# ToDoList Web App

A modern and responsive ToDoList application that allows users to register, log in, and manage their personal todo items** with ease.

This project is built with a React.js frontend and a Node.js + Express backend, connected to a PostgreSQL database on Neon and deployed via Render.

---

## Features

- User Authentication (Sign Up / Sign In with JWT)
- Create new todo items
- Mark todos as complete
- Edit todos title
- Delete or update todos
- Fully responsive UI
- Global state management with Zustand

---

## 🛠 Tech Stack

| Layer         | Technology                        |
|--------------|-----------------------------------|
| Frontend     | React.js, Tailwind CSS, Axios     |
| Backend      | Node.js, Express.js               |
| Database     | PostgreSQL via [Neon](https://neon.tech) |
| ORM          | Prisma                            |
| State Mgmt   | Zustand + Persist (LocalStorage)  |
| Auth         | JSON Web Tokens (JWT)             |
| Deployment   | Render (Frontend + Backend)       |

---

## Live App

> [Deployed on Render](https://todolist-backend-nvzy.onrender.com)  
> Neon PostgreSQL Database in production

---

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/olliewiranphatDEV/ToDoList-Backend

npm i
```
## Create .env and Config your key
DATABASE_URL="mysql://youruser:yourpassword@yourhost/yourdbname"
JWT_SECRET="your_super_secret_key"
PORT=5000

## Generate Prisma client:
``` bash
npx prisma generate
```

## Start the backend server:
``` bash
npm start
```
