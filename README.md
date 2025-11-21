# 📝 To-Do List Application

A full-stack To-Do List web application that helps users organize tasks efficiently. This app supports user authentication, task management, and persistent storage, making it perfect for tracking daily goals and boosting productivity.

## 🚀 Features

- 🔐 User Authentication (Signup / Login)
- ➕ Add new tasks
- ✅ Mark tasks as complete
- 📝 Edit and update tasks
- ❌ Delete tasks
- 🧠 Intuitive and responsive UI
- 📦 Persistent data using MongoDB
- 👥 Each user sees only their own tasks

## 💻 Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Tailwind CSS / CSS Modules (if applicable)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

## 🔐 Authentication Flow

- On signup, user details are securely stored in MongoDB
- JWT is generated and used for protected routes
- Only authenticated users can access and modify their to-do list


## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/todo-app.git](https://github.com/monalib2005/MPB-s-Todo-Application.git)
cd todo-app

cd backend
npm install
# Create a .env file and add your MongoDB URI and JWT_SECRET
node app.js

cd frontend
npm install
npm run dev

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
