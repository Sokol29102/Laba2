const booksUri = 'api/Books';
let books = [];

function getBooks() {
    fetch(booksUri)
        .then(response => response.json())
        .then(data => displayBooks(data))
        .catch(error => console.error('Unable to get books.', error));
}

function displayBooks(data) {
    const tBody = document.getElementById('books');
    tBody.innerHTML = '';

    data.forEach(book => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(book.bookID);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeDescription = document.createTextNode(book.description);
        td2.appendChild(textNodeDescription);

        let td3 = tr.insertCell(2);
        let textNodeScore = document.createTextNode(book.score);
        td3.appendChild(textNodeScore);

        let td4 = tr.insertCell(3);
        let textNodePublishDate = document.createTextNode(book.publishDate);
        td4.appendChild(textNodePublishDate);

        let td5 = tr.insertCell(4);
        let textNodeCreatedAt = document.createTextNode(book.createdAt);
        td5.appendChild(textNodeCreatedAt);

        let td6 = tr.insertCell(5);
        let textNodeUpdatedAt = document.createTextNode(book.updatedAt);
        td6.appendChild(textNodeUpdatedAt);
    });

    books = data;
}

function editBook() {
    const bookId = document.getElementById('edit-book-id').value;
    const book = books.find(book => book.bookID === parseInt(bookId, 10));

    if (book) {
        window.location.href = `editBook.html?bookID=${book.bookID}&description=${book.description}&score=${book.score}&publishDate=${book.publishDate}`;
    } else {
        alert('Book not found');
    }
}

function removeBook() {
    const bookId = document.getElementById('remove-book-id').value.trim();
    if (bookId === '') {
        alert('Please enter a Book ID');
        return;
    }

    fetch(`${booksUri}/${bookId}`, {
        method: 'DELETE'
    })
        .then(() => {
            getBooks();
            document.getElementById('remove-book-id').value = '';
        })
        .catch(error => console.error('Unable to remove book.', error));
}

document.addEventListener("DOMContentLoaded", getBooks);