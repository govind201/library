const myLibrary = [];

const Book = (title, author, pages, read) => {
  return {
    title,
    author,
    pages,
    read,
  };
};

const addBookToLibrary = (book) => {
  myLibrary.push(book);
};

const displayBooks = () => {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    bookList.appendChild(bookCard);
  });
};

const createBookCard = (book, index) => {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.textContent = "Author: " + book.author;

  const pages = document.createElement("p");
  pages.textContent = "Pages: " + book.pages;

  const readStatus = document.createElement("p");
  readStatus.textContent = "Read: " + (book.read ? "Yes" : "No");

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("data-index", index);
  removeBtn.addEventListener("click", removeBook);

  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.textContent = "Toggle Read";
  toggleReadBtn.setAttribute("data-index", index);
  toggleReadBtn.addEventListener("click", toggleReadStatus);

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readStatus);
  bookCard.appendChild(removeBtn);
  bookCard.appendChild(toggleReadBtn);

  return bookCard;
};

const removeBook = (event) => {
  const index = event.target.getAttribute("data-index");
  myLibrary.splice(index, 1);
  displayBooks();
};

const toggleReadStatus = (event) => {
  const index = event.target.getAttribute("data-index");
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
};

const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  newBookForm.style.display = "block";
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readInput = document.getElementById("read");

  const newBook = Book(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
    readInput.checked
  );

  addBookToLibrary(newBook);
  displayBooks();

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;

  newBookForm.style.display = "none";
});

addBookToLibrary(Book("The Hobbit", "J.R.R. Tolkien", 300, false));
addBookToLibrary(
  Book("Harry Potter and the Prisoner of Azkaban", "J.K Rowling", 281, true)
);

displayBooks();
