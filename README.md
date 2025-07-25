# 📚 Library Management System

A simple web-based Library Management System built using **HTML, CSS, JavaScript**, **Node.js**, and **MongoDB**. It supports two user roles: **Admin** and **Customer**. Admins can manage the book inventory, while customers can borrow books and view borrowed records.

---

## ✨ Features

### 🔐 User Authentication
- Sign up & login system for customers
- Simple username-password-based auth

### 📖 Admin Panel
- View all books
- Add new books
- Update or delete existing books

### 👤 Customer Portal
- View available books
- Borrow books
- View borrowed books with due dates
- Overdue books are highlighted

---

## 🧾 Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Frontend   | HTML, CSS, JavaScript |
| Backend    | Node.js (Express)     |
| Database   | MongoDB (NoSQL)       |
| Hosting    | Localhost (default)   |

---

## 🚀 Getting Started

### 1. Clone the Repository


git clone https://github.com/your-username/Library_Management_System.git
cd Library_Management_System 


2. Install Dependencies
npm install

3. Setup MongoDB
Option 1: Hardcode Connection URI (simplest)
Edit server.js:
const uri = "<your_mongodb_connection_string>";

Option 2: Use .env File (recommended for real use)
Create a .env file in the root and add:
MONGODB_URI=<your_mongodb_connection_string>

Also ensure you run:
npm install dotenv

4. Start the Server:
node server.js

Server will start at http://localhost:3000

5. Run the Frontend
You can open the frontend file index.html directly in a browser or use Live Server if using VS Code.


