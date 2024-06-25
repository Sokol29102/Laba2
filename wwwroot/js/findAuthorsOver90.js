const authorsOver90Uri = 'api/Authors/over90Years';

function findAuthorsOver90() {
    fetch(authorsOver90Uri)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch authors who lived more than 90 years.');
            }
            return response.json();
        })
        .then(data => displayAuthorsOver90(data))
        .catch(error => console.error('Unable to fetch authors.', error));
}

function displayAuthorsOver90(data) {
    const container = document.getElementById('authorsOver90');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p>No authors found who lived more than 90 years.</p>';
        return;
    }

    const list = document.createElement('ul');

    data.forEach(author => {
        const listItem = document.createElement('li');
        listItem.textContent = `Author ID: ${author.authorID}, Born: ${author.born}, Death: ${author.death}`;
        list.appendChild(listItem);
    });

    container.appendChild(list);
}
