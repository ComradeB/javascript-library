const libraryContainer = document.querySelector(".library-container");
const removeBookButton = document.querySelector(".remove-book");
const newBookButton = document.querySelector(".new-book");
const newBookForm = document.querySelector(".new-book-form-hidden");
const addBookButton = document.querySelector(".add-book");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#read-status");
const inputElements = document.querySelectorAll("input");

let myLibrary = [];

class Book {
  constructor(author, title, pageNo, readOrNot) {
    this.author = author;
    this.title = title;
    this.pageNo = pageNo;
    this.readOrNot = readOrNot;
    this.info = `Author: ${author}
    Title: ${title}
    Number of pages: ${pageNo}
    Read? ${readOrNot}`;
  }
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
    const that = this;
    libraryContainer.append(newBookDiv);
    addRemoveBookButtonTo(newBookDiv);
    addToggleReadButtonTo(newBookDiv, that);
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
      pages.value.charAt(0) === "0" ||
      pages.value === ""
    )
      return;
    else if (readStatus.checked === true) {
      addBookToLibrary(
        new Book(author.value, title.value, pages.value, (readOrNot = "Yes!"))
      );
      hideForm();
      showLibrary();
    } else {
      addBookToLibrary(
        new Book(
          author.value,
          title.value,
          pages.value,
          (readOrNot = "Not yet...")
        )
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
    (readStatus.checked = false)
  );
  newBookForm.classList.remove("new-book-form-active");
  newBookForm.classList.add("new-book-form-hidden");
}

function addRemoveBookButtonTo(newBookDiv) {
  const removeBookButton = document.createElement("button");
  removeBookButton.textContent = "Remove";
  removeBookButton.addEventListener("click", () => {
    libraryContainer.removeChild(removeBookButton.parentNode);
    myLibrary.splice(myLibrary.indexOf(this), 1);
  });
  newBookDiv.appendChild(removeBookButton);
}

function addToggleReadButtonTo(newBookDiv, that) {
  const toggleReadButton = document.createElement("button");
  toggleReadButton.textContent = this.readOrNot;
  newBookDiv.appendChild(toggleReadButton);
  toggleReadButton.addEventListener("click", () => {
    if (toggleReadButton.textContent === "Yes!") {
      toggleReadButton.textContent = "Not yet...";
      newBookDiv.textContent.replace("Yes!", "Not yet...");
      readStatus.checked = false;
      that.readOrNot = "Not yet...";
    } else {
      toggleReadButton.textContent = "Yes!";
      newBookDiv.textContent.replace("Not yet...", "Yes!");
      readStatus.checked = true;
      that.readOrNot = "Yes!";
    }
  });
}
