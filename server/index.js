const express = require("express");
const bodyParser = require("body-parser");
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.send(`
  GET http://localhost:3000/semuabuku, untuk mendapatkan semua buku
  POST http://localhost:3000/buku, untuk menambah buku
  
`)
);

app.post("/buku", (req, res) => {
  const book = req.body;

  console.log(book);
  books.push(book);

  res.send({ response: "Buku telah ditambahkan !" });
});

app.get("/semuabuku", (req, res) => {
  res.json(books);
});

app.get("/buku/:judul", (req, res) => {
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
});

app.delete("/buku/:isbn", (req, res) => {
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
});

app.put("/buku/:isbn", (req, res) => {
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
});

app.listen(port, () => console.log(`Hello World from port ${port}`));
