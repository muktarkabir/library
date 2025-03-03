const toggleThemeBtn = document.querySelector("#toggle-theme");
const container = document.querySelector("main");
const allBooks = container.querySelectorAll('.book');

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

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const sapiens = new Book("Sapiens", "Yuval Noah Harari", 580, true);
const theAlchemist = new Book("The Alchemist", "Paulo Coelho", 213, true);
const tHS = new Book("The Housemaid's Secret", "Frieda McFadden", 316, true);
const abscenceOfMind = new Book("Absence of Mind", "H.C.H. Ritz", 310, true);

const myLibrary = [sapiens, theAlchemist, tHS, abscenceOfMind];

displayBooks();

function addBooktoLibrary(title, author, noOfPages, read) {
  let book = new Book(title, author, noOfPages, read);
  myLibrary.push(book);
  let newBook = createBookUI(book, myLibrary.at(-1));
  container.append(newBook);
}

function displayBooks() {
  myLibrary.forEach((book, index) => {
    let renderedBook = createBookUI(book, index);
    container.append(renderedBook);
  });
}

function createBookUI(book, index) {
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.dataset.index = index;
  bookDiv.addEventListener('click',(e)=>{
    if (e.target.matches('button.delete')) {
        console.log('Delete button clicked');
    } else if (e.target.matches('button.read')) {
       console.log('read button clicked');
        
    }
  });
  bookDiv.innerHTML = ` 
  <img src= 
    "assets/images/book-open-alt-light-svgrepo-com.svg" alt="open book">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.info()}</p>
            <button type="button" class="read">${
              book.read ? "Completed" : "Pending"
            }</button>
            <button type="button" class="delete">Delete</button>`;
  return bookDiv;
}
