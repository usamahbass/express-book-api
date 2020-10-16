const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

let books = [
  {
    isbn: "12345678",
    judul: "Si Bass",
    penulis: "Bass",
    penerbit: "Raksye",
    tglterbit: "29/06/2020",
    jmlhalaman: 20,
  },
];

app.use(cors());

// body parser middleware
app.use(express.json());

app.get("/", (req, res) =>
  res.send(`
  http://localhost:3000/buku :
    - method: GET, untuk mendapatkan semua buku
    - method: POST, untuk menambah buku

  http://localhost:3000/buku/:judul :
    - method: GET, mendapatkan buku berdasarkan judul

  http://localhost:3000/buku/:isbn :
    - method: GET, mendapatkan buku berdasarkan isbn
    - method: DELETE, menghapus buku
    - method: PUT, mengganti buku yang ada dengan buku baru berdasarkan ISBN yang sama

  contoh response:
    [
      {
        isbn: "12345678",
        judul: "Si Bass",
        penulis: "Bass",
        penerbit: "Raksye",
        tglterbit: "29/06/2020",
        jmlhalaman: 20,
      },
    ];
`)
);

// Main route
app.route('/buku')
  // Get all books
  .get((req, res) => {
    let booksCopy = [].concat(books)

    // Filter books
    for (let query of Object.keys(req.query)) {
      booksCopy = booksCopy.filter(book => book[query].includes(req.query[query]))
    }

    res.json(booksCopy);
  })
  // Create new book
  .post((req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send({ response: "Buku telah ditambahkan !" });
  })

/**
 * Unnecessary. As user can filter books with query params
 */
// With "judul field"
// app.get("/buku/:judul", (req, res, next) => {
//   // membaca judul dari url

//   const judul = req.params.judul;

//   // cari buku dengan judul

//   for (let book of books) {
//     if (book.judul === judul) {
//       res.json(book);
//       return;
//     }
//   }

// tampilkan 404 apabila isbn tidak ditemukan

//   res.send({ response: "Buku tidak ditemukan !" });
// });

// By ISBN
app.route('/buku/:isbn')
  // Get book by ISBN
  .get((req, res) => {
    // membaca judul dari url

    const judul = req.params.judul;

    // cari buku dengan judul

    for (let book of books) {
      if (book.judul === judul) {
        res.json(book);
        return;
      }
    }

    // tampilkan 404 apabila isbn tidak ditemukan

    res.send({ response: "Buku tidak ditemukan !" });
  })
  // Delete book by ISBN
  .delete((req, res) => {
    // membaca isbn dari url

    const isbn = req.params.isbn;

    // hapus buku dari array

    books = books.filter((buku) => {
      if (buku.isbn !== isbn) {
        return true;
      }
      return false;
    });

    res.send({ response: "Buku telah dihapus !" });
  })
  // Edit book by ISBN
  .put((req, res) => {
    // membaca isbn dari url

    const isbn = req.params.isbn;
    const newBook = req.body;

    //  hapus buku dari array dan ganti dengan variabel newBook

    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      if (book.isbn === isbn) {
        books[i] = newBook;
      }
    }

    res.send({ response: "Buku telah diubah !" });
  })

app.listen(port, () => console.log(`Hello World from port ${port}`));
