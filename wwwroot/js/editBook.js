const editBookUri = 'api/Books';

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
    const description = getQueryParameter('description');
    const score = getQueryParameter('score');
    const publishDate = getQueryParameter('publishDate');

    document.getElementById('book-id').value = getQueryParameter('bookID');
    document.getElementById('description').value = description;
    document.getElementById('score').value = score;
    document.getElementById('publishDate').value = publishDate;
});

function updateBook() {
    const bookId = getQueryParameter('bookID');
    const description = document.getElementById('description').value;
    const score = parseInt(document.getElementById('score').value, 10);
    const publishDate = parseInt(document.getElementById('publishDate').value, 10);

    const book = {
        bookID: parseInt(bookId, 10),
        description,
        score,
        publishDate
    };

    fetch(`${editBookUri}/${bookId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update book');
            }
            window.location.href = 'addEditBooks.html';
        })
        .catch(error => console.error('Unable to update book.', error));
}
