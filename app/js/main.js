const baseUrl = "http://localhost:3000";

const loadBooks = () => {
  fetch(`${baseUrl}/semuabuku`)
    .then((res) => {
      return res.json();
    })

    .then((responseJson) => {
      if (responseJson) {
        getBooks(responseJson);
      } else {
        showResponse(responseJson.response);
      }
    })

    .catch((err) => showResponse(err));
};

const saveBooks = (book) => {
  fetch(`${baseUrl}/buku`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "B",
    },
    body: JSON.stringify(book),
  })
    .then((res) => {
      return res.json();
    })
    .then((responseJSON) => {
      showResponse(responseJSON.response);
      loadBooks();
    })
    .catch((err) => {
      console.log("error =>", err);
    });
};

const editBooks = (book) => {
  fetch(`${baseUrl}/buku/${book.isbn}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((res) => {
      return res.json();
    })
    .then((responseJSON) => {
      showResponse(responseJSON.response);
      loadBooks();
    })
    .catch((err) => {
      showResponse(err);
    });
};

const deleteBooks = (bookIsbn) => {
  fetch(`${baseUrl}/buku/${bookIsbn}`, {
    headers: {
      "X-Auth-Token": "B",
    },
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((responseJSON) => {
      showResponse(responseJSON.response);
      loadBooks();
    })
    .catch((err) => showResponse(err));
};

const searchBooks = (value) => {
  fetch(`${baseUrl}/buku/${value}`)
    .then((res) => {
      return res.json();
    })
    .then((responseJSON) => {
      if (responseJSON.response == "Buku tidak ditemukan !") {
        showResponse(responseJSON.response);
      } else {
        getSearchBook(responseJSON);
      }
    })
    .catch((err) => console.log(err));
};

const getSearchBook = (book) => {
  const list = document.querySelector("#allBooks");

  list.innerHTML = "";

  list.innerHTML += `
    <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.judul}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Penulis: ${book.penulis}</div>
                        <div>Penerbit: ${book.penerbit}</div>
                        <div>Jumlah Halaman: ${book.jmlhalaman}</div>

                        <hr>

                        <button type="button" class="btn btn-danger delete-button" id="${book.isbn}">Hapus</button>
                        
                    </div>
                </div>
            </div>
    `;
};

const getBooks = (data) => {
  const list = document.querySelector("#allBooks");

  list.innerHTML = "";

  data.forEach((book) => {
    list.innerHTML += `
    <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.judul}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Penulis: ${book.penulis}</div>
                        <div>Penerbit: ${book.penerbit}</div>
                        <div>Jumlah Halaman: ${book.jmlhalaman}</div>

                        <hr>

                        <button type="button" class="btn btn-danger delete-button" id="${book.isbn}">Hapus</button>
                        
                    </div>
                </div>
            </div>
    `;
  });

  const buttons = document.querySelectorAll(".delete-button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookIsbn = e.target.id;
      deleteBooks(bookIsbn);
    });
  });
};

const showResponse = (response = "Check your internet connection !") => {
  alert(response);
};

document.addEventListener("DOMContentLoaded", () => {
  const saveBook = document.querySelector("#saveBooks");
  const updateBook = document.querySelector("#updateBooks");
  const inputSearch = document.querySelector("#inputBooks");

  saveBook.addEventListener("click", (e) => {
    e.preventDefault();

    let book = {};

    [...document.querySelectorAll("form")].map((elem) => {
      elem
        .querySelectorAll("input")
        .forEach((el) => (book[el.name] = el.value));
    });

    if (Object.keys(book).length === 0) {
      alert("isi form dulu bos !");
    } else {
      saveBooks(book);
    }
  });

  updateBook.addEventListener("click", (e) => {
    e.preventDefault();

    let book = {};

    [...document.querySelectorAll("form")].map((elem) => {
      elem.querySelectorAll("input").forEach((el) => book[el.name] == el.value);
    });

    if (Object.keys(book).length === 0) {
      alert("isi form dulu bos !");
    } else {
      editBooks(book);
    }
  });

  inputSearch.addEventListener("change", function (e) {
    e.preventDefault();
    const value = e.target.value;

    searchBooks(value);
  });

  loadBooks();
});

// <div class="col">
// <div class="card">
//     <div class="card-body">
//         <h5 class="card-title">${book.judul}</h5>
//         <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

//         <div>Penulis: ${book.penulis}</div>
//         <div>Penerbit: ${book.penerbit}</div>
//         <div>Jumlah Halaman: ${book.jmlhalaman}</div>

//         <hr>

//         <button type="button" class="btn btn-danger delete-button" id="${book.isbn}">Hapus</button>

//     </div>
// </div>
// </div>
