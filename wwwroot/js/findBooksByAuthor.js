const findBooksBetweenYearsUri = 'api/Books/findByAuthorYears';
const findBooksBeforeBornUri = 'api/Books/findByAuthorBeforeBorn';

function findBooksBetweenYears() {
    const authorId = document.getElementById('authorId').value;

    if (!authorId) {
        alert('Please enter an Author ID.');
        return;
    }

    fetch(`${findBooksBetweenYearsUri}?authorId=${authorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to find books');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Unable to find books.', error);
            alert('Failed to find books: ' + error.message);
        });
}

function findBooksBeforeBorn() {
    const authorId = document.getElementById('authorId').value;

    if (!authorId) {
        alert('Please enter an Author ID.');
        return;
    }

    fetch(`${findBooksBeforeBornUri}?authorId=${authorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to find books');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Unable to find books.', error);
            alert('Failed to find books: ' + error.message);
        });
}

function displayResults(data) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    data.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `BookID: ${book.bookID}, Description: ${book.description}, PublishDate: ${book.publishDate}`;
        results.appendChild(li);
    });
}
