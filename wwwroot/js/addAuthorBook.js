const authorBooksUri = 'api/AuthorBooks';

function addAuthorBook() {
    const authorID = document.getElementById('author-id').value;
    const bookID = document.getElementById('book-id').value;

    const authorBook = {
        authorID: parseInt(authorID, 10),
        bookID: parseInt(bookID, 10)
    };

    fetch(authorBooksUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorBook)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add author book');
            }
            return response.json();
        })
        .then(() => {
            window.location.href = 'addEditAuthorBooks.html';
        })
        .catch(error => console.error('Unable to add author book.', error));
}