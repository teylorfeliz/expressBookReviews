let books = require("./booksdb.js");

//Get user data based on username
function getUserByUsername(username) {
    for(let i = 0; i < users.length; i++) {
      if(users[i].username === username) {
        return users[i];
      }
    }
    return null;
  }
  
  //Get book review by ISBN
  function getBookReviews(isbn){
    return books[isbn].reviews ? books[isbn].reviews : null;
  }

  //Get all books
  const getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });

  //Get books by author
  function getBooksByAuthor(author){
    return new Promise((resolve, reject) => {
      let results = [];
      for (const id in books) {
        if (books[id].author === author) {
          results.push(books[id]);
        }
      }
      if (results.length) {
        resolve(results);
      } else {
        reject('No books found');
      }
  
    });
  }


    //Get books by title
    function getBooksByTitle(title){
        return new Promise((resolve, reject) => {
          let results = [];
          for (const id in books) {
            if (books[id].title === title) {
              results.push(books[id]);
            }
          }
          if (results.length) {
            resolve(results);
          } else {
            reject('No books found');
          }
      
        });
      }

      function getBookByISBN(isbn) {
        return new Promise((resolve, reject) => {
            if (books[isbn]) {
              resolve(books[isbn]);
            } else {
              reject(isbn);
            }
          });
      }

//Check if the username is present in the db
function isValid(username) { 
    for(let i = 0; i < users.length; i++) {
      if(users[i].username === username) {
        return false;
      }
    }
    return true;
  }
  
  
  //Verify username and password
  function authenticatedUser (username,password) { //returns boolean
      let user = getUserByUsername(username);
      return user && user.password === password;
  }

  module.exports.getBooks = getBooks;
  module.exports.getBooksByAuthor = getBooksByAuthor;
  module.exports.getBookByISBN = getBookByISBN
  module.exports.getBookReviews = getBookReviews;
  module.exports.getUserByUsername = getUserByUsername;
  module.exports.getBooksByTitle = getBooksByTitle;
  module.exports.isValid = isValid;
  module.exports.authenticatedUser = authenticatedUser;