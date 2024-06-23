const addAuthorUri = 'api/Authors';

function saveAuthor() {
    console.log("log1");
    const born = document.getElementById('born').value;
    const death = document.getElementById('death').value || null;
    console.log("log2");
    const author = {
        born: parseInt(born),
        death: death ? parseInt(death) : null
    };

    console.log('Saving author:', author);

    fetch(addAuthorUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
    }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to add author');
            }
            return response.json();
        }).then(data => {
            console.log('Author added:', data);
            window.location.href = 'addEditAuthors.html';
        }).catch(error => {
            console.error('Unable to add author.', error);
            alert('Failed to add author: ' + error.message);
        });
}
