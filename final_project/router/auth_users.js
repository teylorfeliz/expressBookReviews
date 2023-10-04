const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const isValid = require('./utils.js').isValid;
const authenticatedUser = require('./utils.js').authenticatedUser;
const regd_users = express.Router();

let users = [
  {username: "user", password : "pass"}
];


//only registered users can login
regd_users.post("/login", (req,res) => { 
  let username = req.body.username;
  let password = req.body.password;

  let isAuth = authenticatedUser(username, password);
  if(isAuth) {
    let accessToken = jwt.sign({data: password}, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {accessToken, username};
    return res.status(200).json({message: "logged in"});
  }
  return res.status(400).json({message: "Invalid username or password. Please try again."});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const content = req.body.review;
  const username = req.session.authorization.username;


  if(books[isbn].reviews.findIndex((item) => item.username) > -1) {
    books[isbn].reviews = books[isbn].reviews.filter((review) => review.username !== username);
    books[isbn].reviews.push({username, content});
    return res.status(200).json({"message" : "review updated"})
  }
    books[isbn]['reviews'] = [];
    books[isbn]['reviews'].push({username, content});
    return res.status(200).json({"message" : "review added"});
});

// Remove a book review

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if(books[isbn].reviews.findIndex((item) => item.username) > -1) {
     books[isbn].reviews = books[isbn].reviews.filter((review) => review.username !== username);
  }
  return res.status(200).json({"message" : "review removed"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
