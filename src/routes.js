const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'ini halaman home';
    }
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBooksHandler,
  }, // Note the comma here
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteBooksHandler,
  },
];

module.exports = routes;
