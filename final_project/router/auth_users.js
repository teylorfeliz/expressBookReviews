const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  for(let i = 0; i < users.length; i++) {
    if(users[i].username === username) {
      return false;
    }
  }
  return true;
}

const getUserByUsername = (username) =>{
  for(let i = 0; i < users.length; i++) {
    if(users[i].username === username) return users[i];
  }
  return;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    return getUserByUsername(username).password === password;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.getUserByUsername = getUserByUsername;
