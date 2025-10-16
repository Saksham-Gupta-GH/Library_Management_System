
---

# 📚 Library Management System

A simple web-based Library Management System built using **HTML, CSS, JavaScript**, **Node.js**, and **MongoDB**. It supports two user roles: **Admin** and **Customer**. Admins can manage the book inventory, while customers can borrow books and view borrowed records.

🔗 **Live Demo:** [Library Management System Demo](https://library-management-system-1i5e.onrender.com)

---

## ✨ Features

### 🔐 User Authentication

* Sign up & login system for customers
* Simple username-password-based authentication

### 📖 Admin Panel

* View all books
* Add new books
* Update or delete existing books

### 👤 Customer Portal

* View available books
* Borrow books
* View borrowed books with due dates
* Overdue books are highlighted

---

## 🧾 Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | HTML, CSS, JavaScript |
| Backend  | Node.js (Express)     |
| Database | MongoDB (NoSQL)       |
| Hosting  | Localhost / Render    |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Library_Management_System.git
cd Library_Management_System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup MongoDB

**Option 1: Hardcode Connection URI (simplest)**
Edit `server.js`:

```js
const uri = "<your_mongodb_connection_string>";
```

**Option 2: Use `.env` File (recommended for real use)**
Create a `.env` file in the root and add:

```
MONGODB_URI=<your_mongodb_connection_string>
```

Also ensure you install dotenv:

```bash
npm install dotenv
```

### 4. Start the Server

```bash
node server.js
```

Server will start at [http://localhost:3000](http://localhost:3000)

### 5. Run the Frontend

Open `index.html` in a browser directly or use **Live Server** if using VS Code.

---

