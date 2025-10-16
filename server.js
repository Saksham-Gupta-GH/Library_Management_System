// server.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;//VERY IMP: ADD YOUR MONGODB CONNECTION STRING HERE
const client = new MongoClient(uri);
let db, books, users;

async function connectDB() {
  await client.connect();
  db = client.db("libraryDB");
  books = db.collection("books");
  users = db.collection("users");
  console.log("MongoDB Connected");
}
connectDB();

// Admin APIs
app.get("/books", async (req, res) => res.json(await books.find().toArray()));
app.post("/books", async (req, res) => {
  await books.insertOne(req.body);
  res.sendStatus(201);
});
app.put("/books/:id", async (req, res) => {
  await books.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.sendStatus(200);
});
app.delete("/books/:id", async (req, res) => {
  await books.deleteOne({ _id: new ObjectId(req.params.id) });
  res.sendStatus(200);
});

// User Authentication APIs
app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  
  // Check if user already exists
  const existingUser = await users.findOne({ username });
  if (existingUser) {
    return res.json({ success: false, message: "Username already exists" });
  }
  
  // Create new user
  const result = await users.insertOne({ 
    username, 
    password, 
    borrowed: [],
    createdAt: new Date()
  });
  
  res.json({ success: true, userId: result.insertedId });
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await users.findOne({ username, password });
  if (user) {
    res.json({ success: true, userId: user._id });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// Customer APIs
app.post("/borrow", async (req, res) => {
  const { userId, bookId } = req.body;
  const book = await books.findOne({ _id: new ObjectId(bookId) });
  if (book.quantity > 0) {
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks loan period
    
    await books.updateOne({ _id: new ObjectId(bookId) }, { $inc: { quantity: -1 } });
    await users.updateOne(
      { _id: new ObjectId(userId) }, 
      { 
        $push: { 
          borrowed: {
            bookId,
            borrowDate,
            dueDate,
            title: book.title,
            author: book.author
          }
        }
      }, 
      { upsert: true }
    );
    res.sendStatus(200);
  } else {
    res.status(400).send("Out of stock");
  }
});
app.get("/borrowed/:userId", async (req, res) => {
  const user = await users.findOne({ _id: new ObjectId(req.params.userId) });
  if (!user || !user.borrowed) return res.json([]);
  
  // Return borrowed books with dates
  res.json(user.borrowed);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
