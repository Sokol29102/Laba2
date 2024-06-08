const editAuthorUri = 'api/Authors';

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
    const born = getQueryParameter('born');
    const death = getQueryParameter('death');

    document.getElementById('born').value = born;
    document.getElementById('death').value = death || '';
});

function updateAuthor() {
    const authorId = getQueryParameter('authorId');
    const born = document.getElementById('born').value;
    const death = document.getElementById('death').value || null;

    const author = {
        authorID: parseInt(authorId),
        born: parseInt(born),
        death: death ? parseInt(death) : null
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
            window.location.href = 'addEditAuthors.html';
        })
        .catch(error => console.error('Unable to update author.', error));
}
