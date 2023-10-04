const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const getBooks = require('./utils.js').getBooks;
const getBooksByAuthor = require('./utils.js').getBooksByAuthor;
const getBooksByTitle = require('./utils.js').getBooksByTitle;
const getUserByUsername = require('./utils.js').getUserByUsername;
const getBookByISBN = require('./utils.js').getBookByISBN;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  //If username and password are provided
  if (username && password) {
    let user = getUserByUsername(username); //check if the username exists
    if (user) {
      return res.status(400).json({ message: `${username} already exists in the database.` });
    } else {
      users.push({ username, password });
      return res.status(201).json({ message: "user was created!" })
    }
  }
  return res.status(400).json(req.body);
});

//Get all books
public_users.get('/', (req, res) => {
  getBooks.then((books) => {
    return res.status(200).json(books);
  });
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  getBookByISBN(req.params.isbn).then(results => {
    return res.status(200).json(results);
  }).catch(err => {
    return res.status(404).json({ message: "Item no found" })
  });
});

//Get books by author
public_users.get('/author/:author', function (req, res) {
  getBooksByAuthor(req.params.author).then(results => {
    return res.status(200).json(results);
  }).catch(err => {
    return res.status(404).json({ message: "Item no found" });
  });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //const title = req.params.title;
  getBooksByTitle(req.params.title).then(results => {
    return res.status(200).json(results);
  }).catch(err => {
    return res.status(404).json({ message: "Item no found" })
  });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  }
  return res.status(404).json({ message: "Item no found" })
});

module.exports.general = public_users;
