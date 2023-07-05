const { nanoid } = require("nanoid");
const books = require("../models/books");

exports.addBook = (req, res) => {
  const { name, year } = req.body;

  if (!name) {
    const hasil = {
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    };
    res.status(400).json(hasil);
    return hasil;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((books) => books.id === id).length > 0;

  if (isSuccess) {
    const hasil = {
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookid: id,
      },
    };
    res.status(200).json(hasil);
    return hasil;
  }
};

exports.getAllBooks = (req, res) => {
  const { name } = req.query;

  let result = books;

  if (name) {
    result = result.filter(
      (book) => book.name.toLowerCase().includes(name.toLowerCase()) !== false
    );
  }
  const hasil = {
    status: "success",
    data: {
      books: result.map((book) => ({
        id: book.id,
        name: book.name,
        year: book.year,
      })),
    },
  };
  res.status(200).json(hasil);
  return hasil;
};

exports.getBooksById = (req, res) => {
  const { bookId } = req.params;

  const book = books.find((book) => book.id === bookId);

  if (book) {
    const hasil = {
      status: "success",
      data: {
        book,
      },
    };
    res.status(200).json(hasil);
  } else {
    const hasil = {
      status: "fail",
      message: "Buku ditemukan ditemukan",
    };
    res.status(404).json(hasil);
  }
};

exports.editBookById = (req, res) => {
  const { bookId } = req.params;
  const { name, year } = req.body;

  if (!name) {
    const hasil = {
      status: "fail",
      message: "Gagal memperbarui buku",
    };
    res.status(400).json(hasil);
    return hasil;
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      updatedAt: new Date().toISOString(),
    };
    const hasil = {
      status: "success",
      message: "Buku berhasil diperbarui",
    };
    res.status(200).json(hasil);
    return hasil;
  } else {
    const hasil = {
      status: "fail",
      message: "Gagal memperbarui buku, ID tidak ditemukan",
    };
    res.status(404).json(hasil);
    return hasil;
  }
};

exports.deleteById = (req, res) => {
  const { bookId } = req.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const hasil = {
      status: "success",
      message: "Buku berhasil dihapus",
    };
    res.status(200).json(hasil);
    return hasil;
  } else {
    const hasil = {
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    };
    res.status(404).json(hasil);
    return hasil;
  }
};
