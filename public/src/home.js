function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    return acc + book.borrows.filter(notReturned => notReturned.returned === false).length;
  }, 0);
}

function getMostCommonGenres(books) {
  let map = {};
  books.forEach(item => {
    if (map[item.genre]) {
      map[item.genre]++;
    } else {
      map[item.genre] = 1;
    }
  });
  return Object.entries(map).map(([name, count]) => {
    return {
      name,
      count
    }

  }).sort((a,b)=> b.count - a.count).slice(0, 5)
}

function getMostPopularBooks(books) {
  return books.map((book) => {
    return {name: book.title, count: book.borrows.length}
   }).sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5)
}

function getAuthorPopularity(authorId, books) {
  return books.reduce((acc, book) => {
    if(authorId === book.authorId) {
      return acc + book.borrows.length; 
    }
    else {
      return acc
    }
  },0)     
}

function getMostPopularAuthors(books, authors) {
  let result = [];
 authors.forEach((author) => {
  let theAuthor = {
   name: `${author.name.first} ${author.name.last}`,
   count: getAuthorPopularity(author.id, books)
  };
   console.log(theAuthor.count);
  result.push(theAuthor);
 });
 return result.sort((a, b) => b.count - a.count).slice(0, 5);
  
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
