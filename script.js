let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addBookToLibrary = (book) => {
  myLibrary.push(book);
}

const displayBooks = () => {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = 'Author: ' + book.author;

    const pages = document.createElement('p');
    pages.textContent = 'Pages: ' + book.pages;

    const readStatus = document.createElement('p');
    readStatus.textContent = 'Read: ' + (book.read ? 'Yes' : 'No');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('data-index', i);
    removeBtn.addEventListener('click', removeBook);

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = 'Toggle Read';
    toggleReadBtn.setAttribute('data-index', i);
    toggleReadBtn.addEventListener('click', toggleReadStatus);

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(toggleReadBtn);

    bookList.appendChild(bookCard);
  }
}

const removeBook = (event) => {
  const index = event.target.getAttribute('data-index');
  myLibrary.splice(index, 1);
  displayBooks();
}

const toggleReadStatus = (event) => {
  const index = event.target.getAttribute('data-index');
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

const newBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book-form');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => {
  newBookForm.style.display = 'block';
});

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pagesInput = document.getElementById('pages');
  const readInput = document.getElementById('read');

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
    readInput.checked
  );

  addBookToLibrary(newBook);
  displayBooks();

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readInput.checked = false;

  newBookForm.style.display = 'none';
});

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 300, false);
const book2 = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K Rowling', 281, true);
addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks();
