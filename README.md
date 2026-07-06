# Mini ERP – Inventory & Sales Management System (Frontend)

A modern **Inventory & Sales Management System** frontend built with **React**, **TypeScript**, **Redux Toolkit (RTK Query)**, **Tailwind CSS**, and **Shadcn UI**.

## 🔗 Live Demo

- **Frontend:** https://classicit-erp.vercel.app/
- **Backend API:** https://classicit-inventory-api.vercel.app/

---

# Demo Credentials

Use the following accounts to test the application.

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@erp.com | Admin123@ |
| **Manager** | manager@erp.com | Manager123@ |
| **Employee** | employee1@erp.com | Employee123@ |

### Additional Employee Accounts

- employee2@erp.com
- employee3@erp.com
- employee4@erp.com
- employee5@erp.com
- employee6@erp.com
- employee7@erp.com
- employee8@erp.com

Password for all employee accounts:

```text
Employee123@
```

---

# How to Test

1. Visit the live application.

```
https://classicit-erp.vercel.app/
```

2. Login using any of the demo accounts above.

3. Verify role-based permissions.

### Admin

- Dashboard
- Product Management
- Customer Management
- Sales Management
- Profile Management

### Manager

- Dashboard
- Manage Products
- Manage Customers
- Create Sales
- Profile Management

### Employee

- Dashboard
- View Products
- View Customers
- Create Sales
- Profile Management

---

# Features

- JWT Authentication
- Protected Routes
- Role-Based Access Control
- Dashboard with Statistics
- Product Management
- Customer Management
- Sales Management
- User Profile Management
- Global Search
- Responsive Design

---

# Tech Stack

- React
- TypeScript
- React Router
- Redux Toolkit
- RTK Query
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Recharts
- Sonner

---

# Installation

## Clone Repository

```bash
git clone <FRONTEND_GITHUB_REPOSITORY_URL>
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:5000/api/v1
```

## Start Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

---

# Project Structure

```
src
├── components
├── hooks
├── layouts
├── lib
├── pages
├── redux
├── routes
├── types
└── utils
```

---

# Role Permissions

| Feature | Admin | Manager | Employee |
|----------|:-----:|:-------:|:--------:|
| Dashboard | ✅ | ✅ | ✅ |
| View Products | ✅ | ✅ | ✅ |
| Create Product | ✅ | ✅ | ❌ |
| Update Product | ✅ | ✅ | ❌ |
| Delete Product | ✅ | ❌ | ❌ |
| View Customers | ✅ | ✅ | ✅ |
| Create Customer | ✅ | ✅ | ❌ |
| Update Customer | ✅ | ✅ | ❌ |
| Create Sales | ✅ | ✅ | ✅ |
| Profile Management | ✅ | ✅ | ✅ |

---

# Backend Repository

> Add your backend GitHub repository URL here.

---

# Author

**Tarikul Islam**