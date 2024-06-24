const editAuthorUri = 'api/Authors';

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function populateForm() {
    const born = getQueryParameter('born');
    const death = getQueryParameter('death');
    const publisherID = getQueryParameter('publisherID');

    document.getElementById('born').value = born;
    document.getElementById('death').value = death || '';
    document.getElementById('publisherID').value = publisherID || '';
}

function updateAuthor() {
    const authorId = getQueryParameter('authorId');
    const born = document.getElementById('born').value;
    const death = document.getElementById('death').value || null;
    const publisherID = document.getElementById('publisherID').value || null;

    if (!authorId || !born) {
        console.error('Author ID and Born year are required.');
        return;
    }

    const author = {
        authorID: parseInt(authorId, 10),
        born: parseInt(born, 10),
        death: death ? parseInt(death, 10) : null,
        publisherID: publisherID ? parseInt(publisherID, 10) : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    fetch(`${editAuthorUri}/${authorId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update author');
            }
            return response.text();
        })
        .then(data => {
            if (data) {
                console.log('Author updated successfully:', JSON.parse(data));
            } else {
                console.log('Author updated successfully with no response body.');
            }
            window.location.href = 'addEditAuthors.html';
        })
        .catch(error => {
            console.error('Unable to update author.', error);
            alert('Failed to update author: ' + error.message);
        });
}

document.addEventListener('DOMContentLoaded', populateForm);
