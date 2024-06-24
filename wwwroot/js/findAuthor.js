const findAuthorsUri = 'api/Authors/findByYear';

function findAuthors(condition) {
    const year = document.getElementById('year').value;

    if (!year) {
        alert('Please enter a year.');
        return;
    }

    fetch(`${findAuthorsUri}?year=${year}&condition=${condition}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to find authors');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Unable to find authors.', error);
            alert('Failed to find authors: ' + error.message);
        });
}

function displayResults(data) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    data.forEach(author => {
        const li = document.createElement('li');
        li.textContent = `AuthorID: ${author.authorID}, Born: ${author.born}, Death: ${author.death ?? 'N/A'}`;
        results.appendChild(li);
    });
}
