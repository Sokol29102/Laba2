const addPublisherUri = 'api/Publishers';

function savePublisher() {
    const name = document.getElementById('name').value;
    const userId = document.getElementById('user').value;

    const publisher = {
        publisherName: name,
        userID: parseInt(userId, 10)
    };

    console.log('Saving publisher:', publisher);

    fetch(addPublisherUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publisher)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to add publisher');
        }
        return response.json();
    }).then(data => {
        console.log('Publisher added:', data);
        window.location.href = 'addEditPublishers.html';
    }).catch(error => {
        console.error('Unable to add publisher.', error);
        alert('Failed to add publisher: ' + error.message);
    });
}
