document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorID = urlParams.get('authorID');
    const bookID = urlParams.get('bookID');

    document.getElementById('author-id').value = authorID;
    document.getElementById('book-id').value = bookID;
});

function updateAuthorBook() {
    const authorID = document.getElementById('author-id').value;
    const bookID = document.getElementById('book-id').value;

    const authorBook = {
        authorID: parseInt(authorID, 10),
        bookID: parseInt(bookID, 10)
    };

    fetch(`${authorBooksUri}/${authorID}/${bookID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorBook)
    })
        .then(() => {
            window.location.href = 'addEditAuthorBooks.html';
        })
        .catch(error => console.error('Unable to update author book.', error));
}
