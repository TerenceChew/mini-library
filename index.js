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
const bookIdInput = document.querySelector('#book-id');
const addOrUpdateBtn = document.querySelector('.add-update-btn');
const cancelBtn = document.querySelector('.cancel-btn');

// Book factory
const Book = (title, author, totalPages, bookLink, isRead, isFavourite, bookId) => {
  const getTitle = () => title;
  const getAuthor = () => author;
  const getTotalPages = () => totalPages;
  const getBookLink = () => bookLink;
  const getIsRead = () => isRead;
  const getIsFavourite = () => isFavourite;
  const getBookId = () => bookId;
  
  // Toggling
  const toggleRead = () => {
    isRead = !isRead;
  };
  const toggleFavourite = () => {
    isFavourite = !isFavourite;
  };

  // Editing
  const editTitle = (newTitle) => {
    title = newTitle;
  };
  const editAuthor = (newAuthor) => {
    author = newAuthor;
  };
  const editTotalPages = (newTotalPages) => {
    totalPages = newTotalPages;
  };
  const editBookLink = (newBookLink) => {
    bookLink = newBookLink;
  };
  const editIsRead = (newIsRead) => {
    isRead = newIsRead;
  };
  const editIsFavourite = (newIsFavourite) => {
    isFavourite = newIsFavourite;
  };

  return {
    getTitle,
    getAuthor,
    getTotalPages,
    getBookLink,
    getIsRead,
    getIsFavourite,
    getBookId,
    toggleRead,
    toggleFavourite,
    editTitle,
    editAuthor,
    editTotalPages,
    editBookLink,
    editIsRead,
    editIsFavourite
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
    booksContainer.innerText = '';

    myLibrary.forEach(book => {
      let { getTitle, getAuthor, getTotalPages, getBookLink, getIsRead, getIsFavourite, getBookId } = book;
  
      bookController.createBook(getTitle(), getAuthor(), getTotalPages(), getBookLink(), getIsRead(), getIsFavourite(), getBookId());
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
  const createBook = (title, author, totalPages, bookLink, isRead, isFavourite, bookId) => {
    let book = document.createElement('div');
  
    book.dataset.bookId = bookId;
  
    book.append(createControls(isRead, isFavourite), createTitle(title), createAuthor(author), createTotalPages(totalPages), createBtns(bookLink))
  
    book.classList.add('book');
  
    booksContainer.append(book);
  }
  const createControls = (isRead, isFavourite) => {
    let controlsContainer = document.createElement('div');
    let editIcon = document.createElement('img');
    let readIcon = document.createElement('img');
    let favouriteIcon = document.createElement('img');

    editIcon.src = './assets/pencil-outline.svg';
    editIcon.alt = 'edit icon';
    editIcon.style.width, editIcon.style.height = '25px';
    editIcon.addEventListener('pointerup', handleEditIconClick);
  
    readIcon.src = isRead ? './assets/eye-check.svg' : './assets/eye-plus-outline.svg';
    readIcon.alt = 'read icon';
    readIcon.style.width, readIcon.style.height = '25px';
    readIcon.addEventListener('pointerup', handleReadIconClick);
  
    favouriteIcon.src = isFavourite ? './assets/star.svg' : './assets/star-plus-outline.svg';
    favouriteIcon.alt = 'favourite icon';
    favouriteIcon.style.width, favouriteIcon.style.height = '25px';
    favouriteIcon.addEventListener('pointerup', handleFavouriteIconClick);
  
    controlsContainer.classList.add('controls-container');
  
    controlsContainer.append(readIcon, favouriteIcon, editIcon);
  
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
  const createBtns = (bookLink) => {
    let btnsContainer = document.createElement('div'); 
    let readBtn = document.createElement('a');
    let removeBtn = document.createElement('button');
  
    if (bookLink) {
      readBtn.href = bookLink; 
    }

    readBtn.innerText = 'READ';
    removeBtn.innerText = 'REMOVE';
  
    btnsContainer.classList.add('book-btns-container', 'flex-column-center');
    readBtn.classList.add('btn', 'read-btn');
    removeBtn.classList.add('btn', 'remove-btn');
  
    removeBtn.addEventListener('pointerup', removeBook);
  
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
  const handleEditIconClick = (e) => {
    let bookId = e.target.parentElement.parentElement.dataset.bookId;

    myLibrary.forEach(book => {
      if (book.getBookId() === bookId) {
        formController.displayForm(book);
      }
    })
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
  }
})();

// Form module
const formController = (() => {
  let inputErrors = {};
  const displayForm = (book = null) => {
    formContainer.style.display = 'flex';
    formContainer.scrollTop = 0;
    library.style.filter = 'grayscale(35%) blur(2px)';
    library.style.pointerEvents = 'none';

    addOrUpdateBtn.innerText = book ? 'UPDATE' : 'ADD';

    if (book) {
      titleInput.value = book.getTitle();
      authorInput.value = book.getAuthor();
      totalPagesInput.value = book.getTotalPages();
      bookLinkInput.value = book.getBookLink();
      isReadInput.checked = book.getIsRead();
      isFavouriteInput.checked = book.getIsFavourite();
      bookIdInput.value = book.getBookId();
    } 
  }
  const getInputs = () => {
    let title = titleInput.value;
    let author = authorInput.value;
    let totalPages = totalPagesInput.value;
    let bookLink = bookLinkInput.value;
    let isRead = isReadInput.checked;
    let isFavourite = isFavouriteInput.checked;
    let bookId = bookIdInput.value;
    
    return {
      title,
      author,
      totalPages,
      bookLink,
      isRead,
      isFavourite,
      bookId
    }
  }
  const determineAddOrUpdate = (e) => {
    const { title, author, totalPages, bookLink, isRead, isFavourite, bookId } = getInputs();

    validateInputs(title, totalPages, bookLink);

    if (Object.keys(inputErrors).length) return;

    e.target.innerText === 'ADD' ? addBookToMyLibrary(title, author, totalPages, bookLink, isRead, isFavourite) : updateBookInMyLibrary(title, author, totalPages, bookLink, isRead, isFavourite, bookId);
  }
  const addBookToMyLibrary = (title, author, totalPages, bookLink, isRead, isFavourite) => {
    let authorProcessed = author ? author : '-';
    let totalPagesProcessed = totalPages ? totalPages : '-';
    let bookId = `${title}-${utility.getRandomIntInclusive(1, 100000000)}`;
  
    let newBook = Book(title, authorProcessed, totalPagesProcessed, bookLink, isRead, isFavourite, bookId);

    myLibrary.push(newBook);

    bookController.createBook(title, authorProcessed, totalPagesProcessed, bookLink, isRead, isFavourite, bookId);

    resetAndHideForm();
    
    console.log(myLibrary);
  }
  const updateBookInMyLibrary = (title, author, totalPages, bookLink, isRead, isFavourite, bookId) => {
    myLibrary.forEach(book => {
      if (book.getBookId() === bookId) {
        book.editTitle(title);
        book.editAuthor(author);
        book.editTotalPages(totalPages);
        book.editBookLink(bookLink);
        book.editIsRead(isRead);
        book.editIsFavourite(isFavourite);
      
        // console.log('Just Updated');
        // console.log(book.getTitle());
        // console.log(book.getAuthor());
        // console.log(book.getTotalPages());
        // console.log(book.getBookLink());
        // console.log(book.getIsRead());
        // console.log(book.getIsFavourite());
      }
    })
    resetAndHideForm();
    setupController.loadBooks();

    console.log(myLibrary);
  }
  const validateInputs = (title, totalPages, bookLink) => {
    inputErrors = {};

    if (!title) {
      inputErrors.titleError = 'Please enter a title!'
    }
    if (totalPages && totalPages > 10000) {
      inputErrors.totalPagesError = 'Total pages must not exceed 10,000!';
    }
    if (bookLink && !/^(ftp|http|https):\/\/[^ "]+$/.test(bookLink)) {
      inputErrors.bookLinkError = 'Invalid URL!';
    }
  }
  const resetAndHideForm = () => {
    titleInput.value = '';
    authorInput.value = '';
    totalPagesInput.value = '';
    bookLinkInput.value = '';
    isReadInput.checked = false;
    isFavouriteInput.checked = false;
    bookIdInput.value = '';
    
    formContainer.style.display = 'none';
    library.style.filter = 'none';
    library.style.pointerEvents = 'auto';
  }

  return {
    displayForm,
    resetAndHideForm,
    determineAddOrUpdate
  }
})();

// Event listeners
window.addEventListener('load', setupController.loadBooks);
themeIcon.addEventListener('pointerup', themeController.toggleTheme);
addNewBook.addEventListener('pointerup', () => formController.displayForm());
addOrUpdateBtn.addEventListener('pointerup', formController.determineAddOrUpdate);
cancelBtn.addEventListener('pointerup', formController.resetAndHideForm);

// Setups on load
setupController.setFooterYear();
