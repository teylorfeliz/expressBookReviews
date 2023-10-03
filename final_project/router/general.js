const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
let isValid = require("./auth_users.js").isValid;
let getUserByUsername = require("./auth_users.js").getUserByUsername;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  //If username and password are provided
  if(username && password){
    let user = getUserByUsername(username); //check if the username exists
    if(user) {
        return res.status(400).json({message: `${username} already exists in the database.`});
    } else {
      users.push({username, password});
      return res.status(201).json({message: "user was created!"})
    }
  }

  return res.status(400).json(req.body);
});

let getBooks = new Promise((resolve, reject) => {
  resolve(books);
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  getBooks.then((books) => {
    return res.status(200).json(books);
  });
});

public_users.get('/test', (req, res) => {

  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(book) {
    return res.status(200).json(book);
  }
    return res.status(404).json({message: "Item no found"})
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let results = [];
  for(const id in books) {
    if(books[id].author === author) {
      results.push(books[id]);
    }
  }
  if(results.length) {
    return res.status(200).json(results);
  }
  return res.status(404).json({message: "Item no found"})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let results = [];
  for(const id in books) {
    if(books[id].title === title) {
      results.push(books[id]);
    }
  }
  if(results.length) {
    return res.status(200).json(results);
  }
    return res.status(404).json({message: "Item no found"})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(book) {
    return res.status(200).json(book.reviews);
  }
    return res.status(404).json({message: "Item no found"})
});

module.exports.general = public_users;
