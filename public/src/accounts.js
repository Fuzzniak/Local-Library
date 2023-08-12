//use find()
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//use find()
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id.includes(id));
}

//use sort()
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, AccountB) => accountA.name.last.toLowerCase() > AccountB.name.last.toLowerCase() ? 1:-1);

}

//helper function for getTotalNumberofBorrows()
//this should take in a book object and filter it by borrower id
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

//use helper function to find books that have been borrowed, then takes the result length and adds it to a counter
function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  books.forEach(book => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
  });
  return count;
}


//takes in an account object, the books array, and the authors array
//returns an array of possessed book objects that are reordered to have the author object within the book object 
function getBooksPossessedByAccount(account, books, authors) {
  const result = [];
  //find all borrowed books.
  const borrowedBooks = books.filter((book) => book.borrows.some((borrow) => (!borrow.returned && borrow.id === account.id)));
  //define bookAuthor for each borrowed book using findAuthorById function
  //add borrowed book keys + author key in correct order to each result object
  borrowedBooks.forEach((book) => {
    const bookAuthor = findAuthorById(authors, book.authorId);
    result.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
