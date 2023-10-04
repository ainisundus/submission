const { nanoid } = require('nanoid');
const books = require('./books');


const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Tidak melampirkan nama buku pada request body 
  const titleBook = name === undefined || name === '';
  if (titleBook) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400);
    return response;
  };

  // Melampirkan nilai properti readPage > nilai properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  const finished = (pageCount === readPage);

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };
  // Menambahkan buku dari addBooksHandler
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    });
    response.code(201);
    return response;
  };
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  });
  response.code(500);
  return response;
}
// Menampilkan seluruh buku
  
const getAllBooksHandler = () => ({
   status: 'success',
   data: {
      books: books.map((m) => ({
      id: m.id,
      name: m.name,
      publisher: m.publisher,
   }))
  },
});


// Menampilkan detail buku
const getByIdBooksHandler = (request, h) => {
  const { bookId } = request.params;
  const foundBook = books.find((book) => book.id === bookId);

  if (foundBook === undefined) {
    return {
      status: 'success',
      data: {
        book: foundBook
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });
  response.code(404);
  return response;
};

// Mengubah data buku
const editBooksHandler = (request, h) => {
  const { bookId } = request.params;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400);
    return response;
  };
 
  if (index !== -1) {
    book[index] = {
      ...book[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  });
  response.code(404);
  return response;
}

// Menghapus buku
const deleteBooksHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};



module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getByIdBooksHandler,
  editBooksHandler,
  deleteBooksHandler,
};