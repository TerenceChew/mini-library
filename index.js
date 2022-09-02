// Variables
let myLibrary = [];

// {
//   title: 'HARRY POTTER',
//   author: 'JKR',
//   totalPages: 1555,
// }

// General Selectors
const library = document.querySelector('.library');
const addNewBook = document.querySelector('.add-new-book');
const currYearSpan = document.querySelector('#curr-year');
// Book Selectors
const booksContainer = document.querySelector('.books-container');
// Form Selectors
const formContainer = document.querySelector('.form-container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const totalPagesInput = document.querySelector('#total-pages');
const bookLinkInput = document.querySelector('#book-link');
const isReadInput = document.querySelector('#is-read');
const isFavouriteInput = document.querySelector('#is-favourite');
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelector('.cancel-btn');

// Event listeners
window.addEventListener('load', loadBooks); // Loop through library and create each book
addNewBook.addEventListener('pointerdown', displayForm);
addBtn.addEventListener('pointerdown', addBookToMyLibrary);
cancelBtn.addEventListener('pointerdown', resetAndHideForm);

// Setups on load
setFooterYear();

// Book constructor
function Book(title, author, totalPages, link, isRead, isFavourite, bookId) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.link = link;
  this.isRead = isRead;
  this.isFavourite = isFavourite;
  this.bookId = bookId;
}

// Setup functions
function setFooterYear() {
  let currYear = new Date().getFullYear();
  currYearSpan.innerText = `${currYear}`
}

function loadBooks() {
  myLibrary.forEach(book => {
    let { title, author, totalPages } = book;

    createBook(title, author, totalPages);
  })
}

// Utility functions
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Book functions
function createBook(title, author, totalPages, bookId) {
  let book = document.createElement('div');

  book.dataset.bookId = bookId;

  book.append(createControls(), createTitle(title), createAuthor(author), createTotalPages(totalPages), createBtns())

  book.classList.add('book');

  booksContainer.append(book);
}

function createControls() {
  let controlsContainer = document.createElement('div');
  let readIcon = document.createElement('img');
  let favouriteIcon = document.createElement('img');

  readIcon.src = './assets/eye-plus-outline.svg';
  readIcon.alt = 'read icon';
  readIcon.style.width, readIcon.style.height = '25px';

  favouriteIcon.src = './assets/star-plus-outline.svg';
  favouriteIcon.alt = 'favourite icon';
  favouriteIcon.style.width, favouriteIcon.style.height = '25px';

  controlsContainer.classList.add('controls-container');

  controlsContainer.append(readIcon, favouriteIcon);

  return controlsContainer;
}

function createTitle(title) {
  let titleContainer = document.createElement('div');
  let bookTitle = document.createElement('h2');

  bookTitle.innerText = title;

  titleContainer.classList.add('title-container');

  titleContainer.append(bookTitle);

  return titleContainer;
}

function createAuthor(author) {
  let authorContainer = document.createElement('div');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');

  p1.innerText = 'Author:';
  p2.innerText = author;

  authorContainer.classList.add('author-container');

  authorContainer.append(p1, p2);

  return authorContainer;
}

function createTotalPages(totalPages) {
  let totalPagesContainer = document.createElement('div');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');

  p1.innerText = 'Total Pages:';
  p2.innerText = totalPages.toString();

  totalPagesContainer.classList.add('total-pages-container');

  totalPagesContainer.append(p1, p2);

  return totalPagesContainer;
}

function createBtns() {
  let btnsContainer = document.createElement('div'); 
  let readBtn = document.createElement('button');
  let removeBtn = document.createElement('button');

  removeBtn.addEventListener('pointerdown', removeBook);

  readBtn.innerText = 'READ';
  removeBtn.innerText = 'REMOVE';

  btnsContainer.classList.add('book-btns-container', 'flex-column-center');
  readBtn.classList.add('btn', 'read-btn');
  removeBtn.classList.add('btn', 'remove-btn');

  btnsContainer.append(readBtn, removeBtn);

  return btnsContainer;
}

function removeBook(e) {
  let bookId = e.target.parentElement.parentElement.dataset.bookId;
  let currBooks = document.querySelectorAll('.book');

  currBooks.forEach(book => {
    if (book.dataset.bookId === bookId) {
      book.remove();
    }
  })

  myLibrary = myLibrary.filter(book => !book.bookId === bookId);

  console.log(myLibrary)
}

// Form functions
function displayForm() {
  formContainer.style.display = 'flex';
  library.style.filter = 'grayscale(35%) blur(4px)';
  library.style.pointerEvents = 'none';
}

function addBookToMyLibrary() {
  let title = titleInput.value;
  let author = authorInput.value;
  let totalPages = totalPagesInput.value;
  let bookId = `${title}-${getRandomIntInclusive(1, 100000000)}`;

  if (title) {
    let newBook = new Book(title, author, totalPages, bookLinkInput.value, isReadInput.checked, isFavouriteInput.checked, bookId);

    myLibrary.push(newBook);
    createBook(title, author, totalPages, bookId);
    resetAndHideForm();
  }
  
  console.log(myLibrary);
}

function resetAndHideForm() {
  titleInput.value = '';
  authorInput.value = '';
  totalPagesInput.value = '';
  bookLinkInput.value = '';
  isReadInput.checked = false;
  isFavouriteInput.checked = false;

  formContainer.style.display = 'none';
  library.style.filter = 'none';
  library.style.pointerEvents = 'auto';
}