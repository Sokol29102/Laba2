const addAuthorUri = 'api/Authors';

function saveAuthor() {
    const born = document.getElementById('born').value;
    const death = document.getElementById('death').value || null;

    const author = {
        born: parseInt(born),
        death: death ? parseInt(death) : null
    };

    fetch(addAuthorUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add author');
            }
            return response.json();
        })
        .then(() => {
            window.location.href = 'addEditAuthors.html';
        })
        .catch(error => console.error('Unable to add author.', error));
}
