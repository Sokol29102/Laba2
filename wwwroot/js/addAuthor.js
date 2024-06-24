const addAuthorUri = 'api/Authors';

function saveAuthor() {
    const born = document.getElementById('born').value;
    const death = document.getElementById('death').value || null;
    const publisherID = document.getElementById('publisherID').value || null;

    const author = {
        born: parseInt(born, 10),
        death: death ? parseInt(death, 10) : null,
        publisherID: publisherID ? parseInt(publisherID, 10) : null
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
        .then(data => {
            console.log('Author added:', data);
            window.location.href = 'addEditAuthors.html';
        })
        .catch(error => {
            console.error('Unable to add author.', error);
            alert('Failed to add author: ' + error.message);
        });
}