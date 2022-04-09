let myLibrary = [];
let books = document.getElementById("books");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = [title, author, pages].join("-").replaceAll(" ", "-");
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function deleteBookFromLibrary(e) {
    console.log("DELETE BOOK " + this.parentNode.dataset.id);
    let idx = myLibrary.findIndex(
        (book) => book.id === this.parentNode.dataset.id
    );
    console.log(idx);
    myLibrary.splice(idx, 1);
    console.log(myLibrary);
    console.log('[data-id="' + this.parentNode.dataset.id + '"]');
    document
        .querySelector('[data-id="' + this.parentNode.dataset.id + '"]')
        .parentNode.remove();
}

function toggleReadBookStatus(e) {
    console.log("TOGGLE READ");
    if (this.dataset.read === "false") {
        this.dataset.read = "true";
    } else {
        this.dataset.read = "false";
    }
    let book = this.parentNode.parentNode
    book.querySelector(".book-read").innerText =
        formatRead(this.dataset.read);
    book.classList.toggle("read")
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

function addBookToDOM(book, i) {
    let newBook = document.getElementById("book-template").cloneNode(true);
    newBook.classList.remove("hidden");
    newBook.removeAttribute("id");
    // newBook.dataset.id = book.id;
    newBook.querySelector(".book-title").textContent = book.title;
    newBook.querySelector(".book-author").textContent = book.author;
    newBook.querySelector(".book-pages").textContent = formatPages(book.pages);
    newBook.querySelector(".book-read").textContent = formatRead(book.read);
    newBook.querySelector(".book-buttons").dataset.id = book.id;
    newBook
        .querySelector(".book-buttons .delete")
        .addEventListener("click", deleteBookFromLibrary);
    newBook
        .querySelector(".book-buttons .toggle")
        .addEventListener("click", toggleReadBookStatus);
    books.insertBefore(newBook, document.getElementById("add-book"));
}

myLibrary = [
    new Book("Book 1", "Author 1", 1, false),
    new Book("Book 2", "Author 2", 2, true),
    new Book("Book 3", "Author 1", 1, false),
    new Book("Book 4", "Author 2", 2, true),
];

console.log(myLibrary);

// myLibrary.forEach()
myLibrary.forEach((book, i) => addBookToDOM(book, i));
