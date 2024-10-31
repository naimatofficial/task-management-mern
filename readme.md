# 📋 Task Management System

A robust task management application that supports multi-role user access and permissions, designed for efficient task tracking, team collaboration, and streamlined user management. This full-stack application is built using the MERN stack (MongoDB, Express, React, Node.js) and offers role-based access for three distinct user types: Admin, Manager, and Regular User. Each user type has unique permissions and dashboard views, ensuring a tailored and secure experience.

---

## 🚀 Features

### 🎖 User Roles and Permissions

1. **Admin**
   - Create and manage Manager and Regular User accounts.
   - Assign Managers to oversee specific Regular Users.
   - Full access to manage all users and tasks.
2. **Manager**
   - Manage personal tasks and those of assigned Regular Users.
   - Access a customized dashboard with an overview of supervised users and tasks.
3. **Regular User**
   - Create, edit, and delete personal tasks.
   - Access a simple, personalized task dashboard.

### 🗂 Task Management

- **Task Details**: Title, description, due date, and status (pending, in-progress, completed).
- **Filter Options**: Filter tasks by status and due date.
- **Managerial Oversight**: Managers can view and edit tasks of assigned Regular Users.

### 🔐 Secure Authentication

- **JWT Authentication**: Secured login with JSON Web Tokens.
- **Role-Based Authorization**: Each route protected by middleware to check roles.

### 💻 User-Friendly Interface

- **Role-Based Dashboards**: Tailored dashboards for each user role with distinct access controls.
- **Task Filtering and Search**: Enhanced task management with filtering and search capabilities by status and due date.

---

## 🛠️ Technologies Used

### Frontend (Client)

- **React + Vite**: Responsive user interface
- **React Router DOM**: Role-based navigation
- **Redux Toolkit**: State management as needed
- **CSS Frameworks**: (e.g., Tailwind CSS, Ant Design for styling components)

### Backend (Server)

- **Node.js** and **Express**: Server-side logic and RESTful APIs
- **MongoDB** with Mongoose: User, role, and task management
- **JWT**: Token-based authentication
- **Authorization Middleware**: Role-based access control

---

## 📂 Project Structure

```
Task Management System MERN
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── index.js
│
└── client
    ├── public
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── redux
    │   ├── assets
    |   |-- utils
    │   └── main.jsx
    |   └── router
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure to have the following installed on your machine:

- **Node.js**
- **MongoDB**

### 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/naimatofficial/task-management-mern.git
   ```

2. Set up environment variables:

   Create a `.env` file in the `backend` directory with the following:

   ```bash
   DB_URI=your_mongodb_uri
   NODE_ENV='production'

   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_ACCESS_TIME=access_expiration_time
   JWT_REFRESH_TIME=refresh_expiration_time

   JWT_REFRESH_COOKIE_EXPIRES_IN=30
   JWT_ACCESS_COOKIE_EXPIRES_IN=7
   ```

3. Install dependencies and start both servers:

   ```bash
   # Backend setup
   npm install
   npm run server

   # Client setup
   cd client
   npm install
   npm run dev

   # Both Client and Server Setup
   npm run dev
   ```

4. The backend will run on `http://localhost:8000`, and the frontend on `http://localhost:5173`.

---

## 🌐 Usage

1. **Admin Setup**: Start by logging in with the default Admin credentials set in `.env`. Admins can create Managers and Regular Users, assign roles, and manage all tasks and users.
2. **Manager and Regular User Interaction**: Managers can view and manage their tasks and those assigned to them. Regular Users are limited to managing only their tasks.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by popular task management applications and best practices in role-based access control.

### ⚠️ Important Note

This project is still under active development. We’re continuously working to add new features, optimize performance, and enhance functionality. Stay tuned for upcoming updates!
