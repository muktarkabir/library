const toggleThemeBtn = document.querySelector("#toggle-theme");
const container = document.querySelector("main");
const addButton = document.querySelector(".add-book-button");
const addBookDialog = document.querySelector("dialog");
const closeButton = addBookDialog.querySelector("button.close");
const addBookForm = addBookDialog.querySelector("form");
const titleInput = addBookForm.querySelector("#title");
const authorInput = addBookForm.querySelector("#author");
const noOfPagesInput = addBookForm.querySelector("#pages");
const readInput = addBookForm.querySelector("#read");
const submitButton = addBookForm.querySelector("button");
const infoSection = document.querySelector("section.stats");
const totalNoOfBooks = infoSection.querySelector(".total-no-of-books span");
const noOfReadBooks = infoSection.querySelector(".no-finised-books span");
const noOfUnreadBooks = infoSection.querySelector(".no-unfinished-books span");

// Setiing up default light mode
setLightTheme();

//Light and dark mode toggling
toggleThemeBtn.addEventListener("click", function () {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  this.classList.toggle("fa-moon");
  this.classList.add("fa-sun");
});

function setLightTheme() {
  document.documentElement.setAttribute("data-theme", "light");
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${read ? "finised reading" : "not read yet"}.`;
  };
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const sapiens = new Book("Sapiens", "Yuval Noah Harari", 580, true);
const theAlchemist = new Book("The Alchemist", "Paulo Coelho", 213, true);
const tHS = new Book("The Housemaid's Secret", "Frieda McFadden", 316, true);
const abscenceOfMind = new Book("Absence of Mind", "H.C.H. Ritz", 310, true);

const myLibrary = [sapiens, theAlchemist, tHS, abscenceOfMind];

function getLibraryLenght() {
  return myLibrary.length;
}

function addBooktoLibrary(title, author, noOfPages, read) {
  let book = new Book(title, author, noOfPages, read);
  myLibrary.push(book);
  let newBook = createBookUI(book, myLibrary.length - 1);
  console.log(newBook);

  container.append(newBook);
}

function displayAllBooks() {
  myLibrary.forEach((book, index) => {
    let renderedBook = createBookUI(book, index);
    container.append(renderedBook);
    console.log(myLibrary.indexOf(book), renderedBook.dataset.index);
  });
}

function setNumOfReadBooks() {
  noOfReadBooks.textContent = myLibrary.filter((book) => {
    return book.read == true;
  }).length;
}

function setNumOfUnreadBooks() {
  noOfUnreadBooks.textContent = myLibrary.filter((book) => {
    return book.read == false;
  }).length;
}

function createBookUI(book, index) {
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.dataset.index = index;
  let statusText = book.read ? "Completed" : "Pending...";
  bookDiv.addEventListener("click", (e) => {
    let currentBookIndex = parseInt(bookDiv.dataset.index);
    if (e.target.matches("button.delete")) {
      //Implement delete functionality
      myLibrary.splice(currentBookIndex, 1);
      console.log(myLibrary);
    } else if (e.target.matches("button.read")) {
      myLibrary[currentBookIndex].toggleRead();
      myLibrary[currentBookIndex].read
        ? (e.target.textContent = "Completed")
        : (e.target.textContent = "Pending...");
      setNumOfReadBooks();
      setNumOfUnreadBooks();
    }
  });
  bookDiv.innerHTML = ` 
  <img src= 
    "assets/images/book-open-alt-light-svgrepo-com.svg" alt="open book">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.info()}</p>
            <button type="button" class="read">${statusText}</button>
            <button type="button" class="delete">Delete</button>`;
  totalNoOfBooks.textContent = ` ${myLibrary.length}`;
  setNumOfReadBooks();
  setNumOfUnreadBooks();

  return bookDiv;
}

displayAllBooks();

addButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

closeButton.addEventListener("click", () => {
  addBookDialog.close();
  addBookForm.reset();
});

submitButton.addEventListener("click", (e) => {
  if (titleInput.value && authorInput.value && noOfPagesInput.value) {
    e.preventDefault();
    addBookDialog.close();
    let bookTitle = titleInput.value.trim();
    let bookAuthor = authorInput.value.trim();
    let pagesNumber = parseInt(noOfPagesInput.value);
    let readYet = readInput.checked;
    addBooktoLibrary(bookTitle, bookAuthor, pagesNumber, readYet);
    addBookForm.reset();
  }
});
