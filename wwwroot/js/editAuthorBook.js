const authorBooksUri = 'api/AuthorBooks';

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function populateForm() {
    const rid = getQueryParameter('rid');
    const authorID = getQueryParameter('authorID');
    const bookID = getQueryParameter('bookID');

    document.getElementById('rid').value = rid;
    document.getElementById('author-id').value = authorID;
    document.getElementById('book-id').value = bookID;
}

function updateAuthorBook() {
    const rid = document.getElementById('rid').value;
    const authorID = document.getElementById('author-id').value;
    const bookID = document.getElementById('book-id').value;

    const authorBook = {
        rid: parseInt(rid, 10),
        authorID: parseInt(authorID, 10),
        bookID: parseInt(bookID, 10)
    };

    fetch(`${authorBooksUri}/${rid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorBook)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update author book');
            }
            return response.text();
        })
        .then(data => {
            if (data) {
                console.log('Author book updated successfully:', JSON.parse(data));
            } else {
                console.log('Author book updated successfully with no response body.');
            }
            window.location.href = 'addEditAuthorBooks.html';
        })
        .catch(error => {
            console.error('Unable to update author book.', error);
            alert('Failed to update author book: ' + error.message);
        });
}

document.addEventListener('DOMContentLoaded', populateForm);
