let myLibrary = [];
let books = document.getElementById("books");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = [title, author, pages].join("-").replaceAll(" ", "-");
}

document
    .getElementById("new-book-button")
    .addEventListener("click", showNewBookInput);

function showNewBookInput(e) {
    let form = document.getElementById("form-wrapper");
    form.classList.toggle("hidden");
}

document.getElementById("form-submit").addEventListener("click", addNewBook);

function addNewBook(e) {
    addNewBookToDOM(
        new Book(
            this.parentNode.querySelector("#input-title").value,
            this.parentNode.querySelector("#input-author").value,
            this.parentNode.querySelector("#input-pages").value,
            1
        )
    );
    hideNewBookInput(e);
}

function addNewBookToDOM(book) {
    let newBook = document.getElementById("book-template").cloneNode(true);
    newBook.removeAttribute("id");
    newBook.querySelector(".book-title").textContent = book.title;
    newBook.querySelector(".book-author").textContent = book.author;
    newBook.querySelector(".book-pages").textContent = formatPages(book.pages);
    newBook.querySelector(".book-read").textContent = formatRead(book.read);
    newBook.classList.remove("hidden");
    newBook.querySelector(".book-buttons").dataset.id = book.id;
    newBook
        .querySelector(".book-buttons .delete")
        .addEventListener("click", removeBookFromLibrary);
    newBook
        .querySelector(".book-buttons .toggle")
        .addEventListener("click", toggleReadBookStatus);
    books.insertBefore(newBook, document.getElementById("add-book"));
}

function formatPages(pages) {
    if (pages < 0) return "book is from another dimension";
    if (pages === 0) return "book is empty";
    if (pages === 1) return "1 page";
    return pages + " pages";
}

function formatRead(read) {
    if (read === "true") return "Already read";
    return "Not read yet";
}

function removeBookFromLibrary(e) {
    let idx = myLibrary.findIndex(
        (book) => book.id === this.parentNode.dataset.id
    );
    myLibrary.splice(idx, 1);
    removeBookFromDOM(this.parentNode);
}

function removeBookFromDOM(book) {
    document
        .querySelector('[data-id="' + book.dataset.id + '"]')
        .parentNode.remove();
}

function toggleReadBookStatus(e) {
    console.log("TOGGLE READ");
    if (this.dataset.read === "false") {
        this.dataset.read = "true";
    } else {
        this.dataset.read = "false";
    }
    let book = this.parentNode.parentNode;
    book.querySelector(".book-read").innerText = formatRead(this.dataset.read);
    book.classList.toggle("read");
}

function hideNewBookInput(e) {
    let form = document.getElementById("form-wrapper");
    form.classList.toggle("hidden");
}

// Populate library with dummy books

myLibrary = [
    new Book("Book 1", "Author 1", 1, false),
    new Book("Book 2", "Author 2", 2, true),
    new Book("Book 3", "Author 1", 1, false),
    new Book("Book 4", "Author 2", 2, true),
];
myLibrary.forEach((book) => addNewBookToDOM(book));
