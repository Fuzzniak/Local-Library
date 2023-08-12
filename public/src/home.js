//return books.length
function getTotalBooksCount(books) {
  return books.length;
}

//return accounts.length
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//use the partitionBooksByBorrowedStatus(books). return the length of the first array in the array.
function partitionBooksByBorrowedStatus(books) {
  const result = [];
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  const unborrowedBooks = books.filter((book) => book.borrows[0].returned);
  result.push(borrowedBooks);
  result.push(unborrowedBooks);
  return result;
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = partitionBooksByBorrowedStatus(books);
  return borrowedBooks[0].length;
}


//returns array of 5 objects that represents the most common occurring genres, ordered from most common to least.//
/*create some helper functions:
  1: make an array of genres
  2: sort genres by popularity
  3: make a top-five array of genres (helper function)
*/
function getMostCommonGenres(books) {
  const genres = getAllGenres(books);
  const countList = [];
  
  genres.forEach(genre => {
    //list all the books of the given genre then push the count to the countList
    const genreBooks = books.filter(book => book.genre === genre);
    countList.push(genreBooks.length);
  });

  return makeSortedTopFiveNameCountArray(genres, countList);
}

//returns array of 5 objects that represent the most borrowed book, ordered from most popular to least popular
function getMostPopularBooks(books) {
  const bookList = [];
  const countList = [];
  const bookIdList = [];

  books.forEach(book => {
    //test for books being listed multiple times
    if(!bookIdList.includes(book.id)){
      bookIdList.push(book.id);
      //make lists of titles and corresponding number of borrows
      bookList.push(book.title);
      countList.push(book.borrows.length);
    };
  });
  
  return makeSortedTopFiveNameCountArray(bookList, countList);
}

//returns an array of author names and borrow count sorted by popularity
function getMostPopularAuthors(books, authors) {
  //create arrays for formatted author names, a borrow count list, and an authorIdList
  //these will go in the returned makeSortedTopFiveNameCountArray
  const authorList = [];
  const countList = [];
  const authorIdList = [];

  authors.forEach(author => {
    // add authorId to authorIdList
    if (!authorIdList.includes(author.id)) {
    authorIdList.push(author.id);
    //make formatted list of author names (firstName lastName)
    authorList.push(`${author.name.first} ${author.name.last}`);
    //make list of author books, count borrows for each book
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBooksBorrows = authorBooks.map(book => book.borrows.length);
    //reduce array of borrows for each author book to a single number for all an author's borrows
    //add it it a countList that corresponds with the authorList
    countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  
  return makeSortedTopFiveNameCountArray(authorList, countList);
}

//HELPER FUNCTIONS

//a function to list all genres in a given array of books
//takes in an array of books
//returns an array of all the genres included in the books array
function getAllGenres (books) {
  const genres = [];
  books.forEach(book => {
    //make sure a genres array doesn't repeat itself
    if (!genres.includes(book.genre)) genres.push(book.genre);
  });
  return genres;
}

//takes an array of descriptors and makes an array of objects in this format: [{name: descriptop, count: 0}]
//takes an array of names, and an array of counts (these should correspond by index)
//returns an array of objects
function makeNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}

//puts an array of name / count objects into order from highest to lowest count
//takes in an array of name / count objects
//returns the sorted nameCount array
function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}

//a function to shorten a list to 5 or less items
//takes in an array
//returns an array that is 5 or less items long
function topFive (list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}

//a function to create the formatted return for all the top 5 lists here
//takes in an array of names and an array of counts (these should correspond by index)
//returns a sorted array of 5 objects similar to {name: "name", count: number}
//uses orderByCount() & topFive() functions
function makeSortedTopFiveNameCountArray (nameList, countList)
{
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
