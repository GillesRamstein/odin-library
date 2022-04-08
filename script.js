let myLibrary = [];
let books = document.getElementById("books");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function formatPages(pages) {
    if (pages < 0) return "book is from another dimension";
    if (pages === 0) return "book is empty";
    if (pages === 1) return "1 page";
    return pages + " pages";
}

function formatRead(read) {
    if (read) return "Already read";
    return "Not read yet";
}

function displayBook(book) {
    let newBook = document.getElementById("book-template").cloneNode(true);
    newBook.classList.remove("hidden");
    newBook.querySelector("#book-title").textContent = book.title;
    newBook.querySelector("#book-author").textContent = book.author;
    newBook.querySelector("#book-pages").textContent = formatPages(book.pages);
    newBook.querySelector("#book-read").textContent = formatRead(book.read);
    books.insertBefore(newBook, document.getElementById("add-book"));
}

myLibrary = [
    new Book("Book 1", "Author 1", 1, false),
    new Book("Book 2", "Author 2", 2, true),
];

myLibrary.forEach((book) => displayBook(book));
