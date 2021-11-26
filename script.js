const container = document.querySelector(".container");
const removeBookButton = document.querySelector(".remove-book");
const newBookButton = document.querySelector(".new-book");

let myLibrary = [];

function Book(author, title, pageNo, readOrNot) {
  this.author = author;
  this.title = title;
  this.pageNo = pageNo;
  this.readOrNot = readOrNot;
  this.info = `Author: ${author} Title: ${title} Number of pages: ${pageNo} Read? ${readOrNot}`;
}

Book.prototype = {
  toggleRead() {
    const readStatusButton = document.createElement("button");
    readStatusButton.addEventListener("click", (e) => {
      e.target.classList.toggle(".not-read");
      if (e.target.classList.contains(".not-read")) {
        e.target.textContent = "Not read yet";
        e.target.style.backgroundColor = "rgb(255, 158, 158)";
      } else
        (e.target.textContent = "Read"),
          (e.target.style.backgroundColor = "aquamarine");
    });
    newBookDiv.appendChild(readStatusButton);
  },

  deleteBook() {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove book";
    deleteButton.style.cssText =
      "background-color: rgb(255, 158, 158); border: none; padding: 0.5rem; border-radius: 5px;";
    deleteButton.addEventListener("click", () => {
      container.removeChild(newBook);
    });
    newBook.appendChild(deleteButton);
  },
};

function addBook() {
  newBookButton.addEventListener("click", () => {
    const newBook = new Book("JK", "HP", 255, true);
    myLibrary.push(newBook.info);
    displayLibrary();
  });
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    const newBookDiv = document.createElement("div");
    newBookDiv.classList.add("book");
    newBookDiv.textContent = book.info;
    container.appendChild(newBookDiv);
    toggleRead();
    deleteBook();
  });
}

addBook();
