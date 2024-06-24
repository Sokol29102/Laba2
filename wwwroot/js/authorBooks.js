const authorBooksUri = 'api/AuthorBooks';
let authorBooks = [];

function getAuthorBooks() {
    fetch(authorBooksUri)
        .then(response => response.json())
        .then(data => displayAuthorBooks(data))
        .catch(error => console.error('Unable to get author books.', error));
}

function displayAuthorBooks(data) {
    const tBody = document.getElementById('authorbooks');
    tBody.innerHTML = '';

    data.forEach(authorBook => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(authorBook.rid);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        textNode = document.createTextNode(authorBook.authorID);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        textNode = document.createTextNode(authorBook.bookID);
        td3.appendChild(textNode);
    });

    authorBooks = data;
}

function editAuthorBook() {
    const authorBookId = document.getElementById('edit-authorbook-id').value;
    const authorBook = authorBooks.find(authorBook => authorBook.rid === parseInt(authorBookId, 10));

    if (authorBook) {
        window.location.href = `editAuthorBook.html?authorID=${authorBook.authorID}&bookID=${authorBook.bookID}`;
    } else {
        alert('AuthorBook not found');
    }
}

function removeAuthorBook() {
    const authorBookId = document.getElementById('remove-authorbook-id').value.trim();
    if (authorBookId === '') {
        alert('Please enter an AuthorBook RID');
        return;
    }

    fetch(`${authorBooksUri}/${authorBookId}`, {
        method: 'DELETE'
    })
        .then(() => {
            getAuthorBooks();
            document.getElementById('remove-authorbook-id').value = '';
        })
        .catch(error => console.error('Unable to remove author book.', error));
}

document.addEventListener("DOMContentLoaded", getAuthorBooks);
