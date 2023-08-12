//use find()
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//use find()
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//takes in an array of books
/*returns a new array of books with two arrays in it: 
  1: an array of borrowed books
  2: an array of unborrowed books
*/
//use filter() to create the 2 arrays
function partitionBooksByBorrowedStatus(books) {
  const result = [];
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  const unborrowedBooks = books.filter((book) => book.borrows[0].returned);
  result.push(borrowedBooks);
  result.push(unborrowedBooks);
  return result;
}

//takes 2 parameters :- A book object,- An array of all account objects.
/*Return an array of <= 10 account objects that represents:
  accounts given by the IDs in the provided book's `borrows` array. 
  However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.*/
function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  borrows.forEach(borrow => {
    if (result.length >= 10) return;
    const borrowerAccount = accounts.find((account) => account.id === borrow.id);
    const resultFormat = {...borrow, ...borrowerAccount};
    result.push(resultFormat);
    });
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
