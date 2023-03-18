// {
//     id: string | number,
//     title: string,
//     author: string,
//     year: number,
//     isComplete: boolean,
//   }


// Input data
const books = [];
const RENDER_EVENT = 'render-book';

// menampilkan data setelah diinput
document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});

function generatedBookObject() {
    return +new Date();
}

function generatedBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

// memanggil fungsi baru
function findBook(bookId) {
    for (const bookItem of books) {
        if(bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function makeBook(bookObject) {
    // const { id, title, author, year, isCompleted} = bookObject;

    const textTitleBook = document.createElement('h2');
    textTitleBook.innerText = title;

    const textAuthorBook = document.createElement('p');
    textAuthorBook.innerText = author;

    const year = document.createElement('p');
    year.innerText = year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitleBook, textAuthorBook, year);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `book-${id}`);

    if (bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function() {
            undoTaskFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click', function() {
            removeTaskFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton);
    }else {
        const chectButton = document.createElement('button');
        chectButton.classList.add('check-button');

        chectButton.addEventListener('click', function() {
            addTaskToCompleted(bookObject.id);
        });

        container.append(chectButton);
    }

    return container;
}

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('bookSubmit', function(event) {
        event.preventDefault();
        addBook();
    });

    // if (isStorageExist()) {
    //     loadDataFromStorage();
    // }
});

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;

    const generatedID = generatedID;
    const bookObject = generatedBookObject(generatedID, bookTitle,bookAuthor,bookYear. false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// untuk menampilkan data sesuai
document.addEventListener(RENDER_EVENT, function() {
    const uncompletedBookList = document.getElementById('books');
    uncompletedBookList.innerHTML = '';

    const completedBookList = document.getElementById('completed-books');
    completedBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted) 
            uncompletedBookList.append(bookElement);
            else 
            completedBookList.append(bookElement);
    }

    // console.log(books);
    // const uncompletedBookList = document.getElementById('books');
    // uncompletedBookList.innerHTML = '';

    // for (const bookItem of books) {
    //     const bookElement = makeBook(bookItem);
    //     uncompletedBookList.append(bookElement);
    // }
});

// memindahkan buku antar rak

function addTaskToCompleted (bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// menghapus

function removeTaskFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);

    if(bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


function undoTaskFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// function saveData() {
//     if (isStorageExist()) {
//         const parsed = JSON.stringify(books);
//         localStorage.setItem(STORAGE_KEY, parsed);
//         document.dispatchEvent(new Event(RENDER_EVENT));
//     }
// }

// const SAVED_EVENT = 'saved-books';
// const STORAGE_KEY = 'BOOKS_APPS';

// function isStorageExist() {
//     if (typeof (Storage) === undefined) {
//         alert('Browser Kamu Tidak Mendukung Local Storage');
//         return false;
//     }
//     return true;
// }

// document.addEventListener(SAVED_EVENT, function() {
//     console.log(localStorage.getItem(STORAGE_KEY));
// });

// function loadDataFromStorage() {
//     const serializeData = localStorage.getItem(STORAGE_KEY);
//     let data = JSON.parse(serializeData);

//     if (data !=null) {
//         for (const book of data) {
//             books.push(book);
//         }
//     }
//     document.dispatchEvent(new Event(RENDER_EVENT));
// }