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
        let textNodeAuthorID = document.createTextNode(authorBook.authorID);
        td1.appendChild(textNodeAuthorID);

        let td2 = tr.insertCell(1);
        let textNodeBookID = document.createTextNode(authorBook.bookID);
        td2.appendChild(textNodeBookID);
    });

    authorBooks = data;
}

function editAuthorBook() {
    const authorBookId = document.getElementById('edit-authorbook-id').value;
    const authorBook = authorBooks.find(authorBook => authorBook.id === parseInt(authorBookId, 10));

    if (authorBook) {
        window.location.href = `editAuthorBook.html?authorID=${authorBook.authorID}&bookID=${authorBook.bookID}`;
    } else {
        alert('AuthorBook not found');
    }
}
