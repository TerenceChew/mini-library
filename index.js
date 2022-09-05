// Variables
let myLibrary = [];

// General selectors
const library = document.querySelector('.library');
const header = document.querySelector('header');
const themeIcon = document.querySelector('[alt="theme icon"]');
const logInBtn = document.querySelector('.log-in');
const footerText = document.querySelector('.footer-text');
const currYearSpan = document.querySelector('#curr-year');
const addNewBook = document.querySelector('.add-new-book');
const booksContainer = document.querySelector('.books-container');
// Form selectors
const formContainer = document.querySelector('.form-container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const totalPagesInput = document.querySelector('#total-pages');
const bookLinkInput = document.querySelector('#book-link');
const isReadInput = document.querySelector('#is-read');
const isFavouriteInput = document.querySelector('#is-favourite');
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelector('.cancel-btn');

// Book factory
const Book = (title, author, totalPages, link, isRead, isFavourite, bookId) => {
  const getTitle = () => title;
  const getAuthor = () => author;
  const getTotalPages = () => totalPages;
  // const getLink = () => link;
  const getIsRead = () => isRead;
  const getIsFavourite = () => isFavourite;
  const getBookId = () => bookId;
  // const editTitle = (newTitle) => {
  //   title = newTitle;
  // };
  // const editAuthor = (newAuthor) => {
  //   author = newAuthor;
  // };
  // const editTotalPages = (newTotalPages) => {
  //   totalPages = newTotalPages;
  // };
  const toggleRead = () => {
    isRead = !isRead;
  };
  const toggleFavourite = () => {
    isFavourite = !isFavourite;
  };

  return {
    getTitle,
    getAuthor,
    getTotalPages,
    getIsRead,
    getIsFavourite,
    getBookId,
    toggleRead,
    toggleFavourite
  }
}

// Theme module
const themeController = (() => {
  const toggleTheme = () => {
    header.classList.toggle('dark');
    logInBtn.classList.toggle('dark');
    library.classList.toggle('dark');
    footerText.classList.toggle('dark');
  
    let isDarkMode = Array.from(header.classList).includes('dark') ? true : false;
  
    themeIcon.src = isDarkMode ? './assets/white-balance-sunny.svg' : './assets/weather-night.svg';
  };

  return {
    toggleTheme
  }
})();

// Setup module
const setupController = (() => {
  const setFooterYear = () => {
    let currYear = new Date().getFullYear();
    currYearSpan.innerText = `${currYear}`
  }
  const loadBooks = () => {
    myLibrary.forEach(book => {
      let { getTitle, getAuthor, getTotalPages, getBookId } = book;
  
      bookController.createBook(getTitle(), getAuthor(), getTotalPages(), getBookId());
    })
  }

  return {
    setFooterYear,
    loadBooks
  }
})();

// Utility module
const utility = (() => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return {
    getRandomIntInclusive
  }
})();

// Book module
const bookController = (() => {
  const createBook = (title, author, totalPages, isRead, isFavourite, bookId) => {
    let book = document.createElement('div');
  
    book.dataset.bookId = bookId;
  
    book.append(createControls(isRead, isFavourite), createTitle(title), createAuthor(author), createTotalPages(totalPages), createBtns())
  
    book.classList.add('book');
  
    booksContainer.append(book);
  }
  const createControls = (isRead, isFavourite) => {
    let controlsContainer = document.createElement('div');
    let readIcon = document.createElement('img');
    let favouriteIcon = document.createElement('img');
  
    readIcon.src = isRead ? './assets/eye-check.svg' : './assets/eye-plus-outline.svg';
    readIcon.alt = 'read icon';
    readIcon.style.width, readIcon.style.height = '25px';
    readIcon.addEventListener('pointerdown', handleReadIconClick);
  
    favouriteIcon.src = isFavourite ? './assets/star.svg' : './assets/star-plus-outline.svg';
    favouriteIcon.alt = 'favourite icon';
    favouriteIcon.style.width, favouriteIcon.style.height = '25px';
    favouriteIcon.addEventListener('pointerdown', handleFavouriteIconClick);
  
    controlsContainer.classList.add('controls-container');
  
    controlsContainer.append(readIcon, favouriteIcon);
  
    return controlsContainer;
  }
  const createTitle = (title) => {
    let titleContainer = document.createElement('div');
    let bookTitle = document.createElement('h2');
  
    bookTitle.innerText = title;
  
    titleContainer.classList.add('title-container');
  
    titleContainer.append(bookTitle);
  
    return titleContainer;
  }
  const createAuthor = (author) => {
    let authorContainer = document.createElement('div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
  
    p1.innerText = 'Author:';
    p2.innerText = author;
  
    authorContainer.classList.add('author-container');
  
    authorContainer.append(p1, p2);
  
    return authorContainer;
  }
  const createTotalPages = (totalPages) => {
    let totalPagesContainer = document.createElement('div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
  
    p1.innerText = 'Total Pages:';
    p2.innerText = totalPages.toString();
  
    totalPagesContainer.classList.add('total-pages-container');
  
    totalPagesContainer.append(p1, p2);
  
    return totalPagesContainer;
  }
  const createBtns = () => {
    let btnsContainer = document.createElement('div'); 
    let readBtn = document.createElement('button');
    let removeBtn = document.createElement('button');
  
    readBtn.innerText = 'READ';
    removeBtn.innerText = 'REMOVE';
  
    btnsContainer.classList.add('book-btns-container', 'flex-column-center');
    readBtn.classList.add('btn', 'read-btn');
    removeBtn.classList.add('btn', 'remove-btn');
  
    removeBtn.addEventListener('pointerdown', removeBook);
  
    btnsContainer.append(readBtn, removeBtn);
  
    return btnsContainer;
  }
  const removeBook = (e) => {
    let bookId = e.target.parentElement.parentElement.dataset.bookId;
    let currBooks = document.querySelectorAll('.book');
  
    currBooks.forEach(book => {
      if (book.dataset.bookId === bookId) {
        book.remove();
      }
    })
  
    myLibrary = myLibrary.filter(book => book.getBookId() !== bookId);
  
    console.log(myLibrary);
  }
  const handleReadIconClick = (e) => {
    let readIcon = e.target;
    let bookId = e.target.parentElement.parentElement.dataset.bookId;
    
    myLibrary.forEach(book => {
      if (book.getBookId() === bookId) {
        book.toggleRead();
        readIcon.src = book.getIsRead() ? './assets/eye-check.svg' : './assets/eye-plus-outline.svg';
      }
    })
  }
  const handleFavouriteIconClick = (e) => {
    let favouriteIcon = e.target;
    let bookId = e.target.parentElement.parentElement.dataset.bookId;
    
    myLibrary.forEach(book => {
      if (book.getBookId() === bookId) {
        book.toggleFavourite();
        favouriteIcon.src = book.getIsFavourite() ? './assets/star.svg' : './assets/star-plus-outline.svg';
      }
    })
  }

  return {
    createBook,
    createControls,
    createTitle,
    createAuthor,
    createTotalPages,
    createBtns,
    removeBook,
    handleReadIconClick,
    handleFavouriteIconClick
  }
})();

// Form module
const formController = (() => {
  const displayForm = () => {
    formContainer.style.display = 'flex';
    library.style.filter = 'grayscale(35%) blur(4px)';
    library.style.pointerEvents = 'none';
  }
  const addBookToMyLibrary = () => {
    let title = titleInput.value;
    let author = authorInput.value ? authorInput.value : '-';
    let totalPages = totalPagesInput.value ? totalPagesInput.value : '-';
    let bookLink = bookLinkInput.value;
    let isRead = isReadInput.checked;
    let isFavourite = isFavouriteInput.checked;
    let bookId = `${title}-${utility.getRandomIntInclusive(1, 100000000)}`;
  
    if (title) {
      let newBook = Book(title, author, totalPages, bookLink, isRead, isFavourite, bookId);
  
      myLibrary.push(newBook);
      bookController.createBook(title, author, totalPages, isRead, isFavourite, bookId);
      resetAndHideForm();
    }
    console.log(myLibrary);
  }
  const resetAndHideForm = () => {
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

  return {
    displayForm,
    addBookToMyLibrary,
    resetAndHideForm
  }
})();

// Event listeners
window.addEventListener('load', setupController.loadBooks);
themeIcon.addEventListener('pointerdown', themeController.toggleTheme);
addNewBook.addEventListener('pointerdown', formController.displayForm);
addBtn.addEventListener('pointerdown', formController.addBookToMyLibrary);
cancelBtn.addEventListener('pointerdown', formController.resetAndHideForm);

// Setups on load
setupController.setFooterYear();