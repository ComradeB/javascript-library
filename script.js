const libraryContainer = document.querySelector(".library-container");
const removeBookButton = document.querySelector(".remove-book");
const newBookButton = document.querySelector(".new-book");
const newBookForm = document.querySelector(".new-book-form-hidden");
const addBookButton = document.querySelector(".add-book");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#read-status");
const labelElements = document.querySelectorAll("label");
const inputElements = document.querySelectorAll("input");
const form = document.querySelector("ul");

let myLibrary = [];

function Book(author, title, pageNo, readOrNot) {
  this.author = author;
  this.title = title;
  this.pageNo = pageNo;
  this.readOrNot = readOrNot;
  this.info = `Author: ${author}
    Title: ${title}
    Number of pages: ${pageNo}
    Read? ${readOrNot}`;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showLibrary() {
  libraryContainer.replaceChildren();
  myLibrary.forEach((book) => {
    const newBookDiv = document.createElement("div");
    newBookDiv.classList.add("book");
    newBookDiv.textContent = book.info;
    libraryContainer.append(newBookDiv);
    addRemoveBookButton(newBookDiv);
  });
}

newBookButton.addEventListener("click", () => {
  showForm();
  addBookButton.addEventListener("click", () => {
    if (
      author.value === "" ||
      author.value === /\d/ ||
      title.value === "" ||
      title.value === /\d/ ||
      pages.value === "0" ||
      pages.value === ""
    )
      return;
    else {
      addBookToLibrary(
        new Book(author.value, title.value, pages.value, readStatus.value)
      );
      hideForm();
      showLibrary();
    }
  });
});

function showForm() {
  newBookForm.classList.remove("new-book-form-hidden");
  newBookForm.classList.add("new-book-form-active");
}

function hideForm() {
  inputElements.forEach(
    (input) => (input.value = ""),
    (readStatus.value = "off")
  );
  newBookForm.classList.remove("new-book-form-active");
  newBookForm.classList.add("new-book-form-hidden");
}

function addRemoveBookButton(newBookDiv) {
  const removeBookButton = document.createElement("button");
  removeBookButton.textContent = "Remove";
  removeBookButton.addEventListener("click", () => {
    removeBookButton.parentNode.replaceChildren();
    myLibrary.splice(myLibrary.indexOf(this), 1)
  });
  newBookDiv.appendChild(removeBookButton);
}
