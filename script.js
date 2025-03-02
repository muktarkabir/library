const toggleThemeBtn = document.querySelector("#toggle-theme");
const container = document.querySelector("main");

const myLibrary = [];

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

function setDarkTheme() {
  document.documentElement.setAttribute("data-theme", "dark");
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

const sapiens = new Book("Sapiens", "Yuval Noah Harari", 309, false);
const theAlchemist = new Book("The Alchemist", "Paulelo Coelho", 400, true);
const theHousemaidsSecret = new Book("The Housemaid\'s Secret", "Frieda McFadden", 240, true);

myLibrary.push(sapiens, theAlchemist, theHousemaidsSecret);
console.log(myLibrary);

myLibrary.forEach((book) => {
  let renderedBook = createBookUI(book);
  container.append(renderedBook);
});

function addBooktoLibrary(book) {}

function createBookUI(book) {
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.innerHTML = ` 
  <img src= 
    "assets/images/book-closed-svgrepo-com.svg" alt="book">
            <p>${book.title}</p>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <p>${book.info()}</p>
            <button type="button">Read</button>
            <button type="button">Delete</button>`;
  return bookDiv;
}
