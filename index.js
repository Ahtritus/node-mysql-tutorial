const PORT = "3000";

const express = require("express");
const mysql = require("mysql");

//creating connection for mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

const app = express();

//Creating the DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

//creating table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id));";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts Table created...");
  });
});

// Insert Post 1 into table
app.get("/addpost1", (req, res) => {
  let post = { title: "Post One", body: "This is post number one" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added...");
  });
});

// Insert Post 2 into Table
app.get("/addpost2", (req, res) => {
  let post = { title: "Post", body: "I am learning DB" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 2 added...");
  });
});

// get all posts from the table
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    // res.send("Posts fetched");
    res.send(results);
  });
});

// get a single post from the table with id
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT title FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    // res.send("Posts fetched");
    res.send(result);
  });
});

// update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Post Two";
  let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    // res.send("Posts fetched");
    res.send(result);
  });
});

// delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    // res.send("Posts fetched");
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
