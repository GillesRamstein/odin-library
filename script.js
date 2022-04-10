let myLibrary = [];
let books = document.getElementById("books");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = [title, author, pages].join("-").replaceAll(" ", "-");
}

function centerBooks() {
    const margins = 2 * 8;
    let bookWidth = document.getElementById("add-book").offsetWidth + margins;
    let books = document.getElementById("books");
    let maxWidth = books.parentNode.offsetWidth;
    let maxBooks = Math.floor(maxWidth / bookWidth);
    booksWidth = maxBooks * bookWidth;
    books.style.width = booksWidth + "px";
}
window.onresize = centerBooks;
centerBooks();

function showNewBookInput(e) {
    let form = document.getElementById("form-wrapper");
    form.classList.toggle("hidden");
}
document
    .getElementById("new-book-button")
    .addEventListener("click", showNewBookInput);

function cancelAddBookForm(e) {
    let form = this.parentNode.parentNode;
    form.reset();
    let formWrapper = form.parentNode;
    formWrapper.classList.toggle("hidden");
}
document
    .getElementById("form-cancel")
    .addEventListener("click", cancelAddBookForm);

function submitNewBookForm(e) {
    let form = this.parentNode.parentNode;
    if (!form.reportValidity()) {
        return;
    }
    addNewBookToDOM(
        new Book(
            form.querySelector("#input-title").value,
            form.querySelector("#input-author").value,
            form.querySelector("#input-pages").value,
            1
        )
    );
    let formWrapper = form.parentNode;
    formWrapper.classList.toggle("hidden");
}
document
    .getElementById("form-submit")
    .addEventListener("click", submitNewBookForm);

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
    if (pages === 1) return "(1 page)";
    return "(" + pages + " pages)";
}

function formatRead(read) {
    if (read === "true") return "(Already read)";
    return "(Not read yet)";
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
    if (this.dataset.read === "false") {
        this.dataset.read = "true";
    } else {
        this.dataset.read = "false";
    }

    let book = this.parentNode.parentNode;
    book.querySelector(".book-read").innerText = formatRead(this.dataset.read);
    book.classList.toggle("read");

    let isReadIcon = this.querySelector(".book-read-icon");
    if (isReadIcon.src.includes("not-read.svg")) {
        isReadIcon.src = isReadIcon.src.replace("not-read.svg", "is-read.svg");
        isReadIcon.title = "Mark book as not read yet";
    } else if (isReadIcon.src.includes("is-read.svg")) {
        isReadIcon.src = isReadIcon.src.replace("is-read.svg", "not-read.svg");
        isReadIcon.title = "Mark book as read";
    }
}

// Populate library with dummy books

myLibrary = [
    new Book("Dummy Book 1", "Jane Smith", 1, false),
    new Book("Dummy Book 2", "Peter Muster", 2, true),
    new Book("Bitcoin White-Paper", "Satoshi Nakamoto", 9, false),
    new Book("Anarchist Cookbook", "William Powell", 164, true),
];
myLibrary.forEach((book) => addNewBookToDOM(book));
