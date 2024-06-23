const editPublisherUri = 'api/Publishers';

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
    const name = getQueryParameter('name');
    const userId = getQueryParameter('userID');

    document.getElementById('name').value = name;
    document.getElementById('user').value = userId;
});

function updatePublisher() {
    const publisherId = getQueryParameter('publisherId');
    const name = document.getElementById('name').value;
    const userId = document.getElementById('user').value;

    if (!publisherId || !name || !userId) {
        console.error('Publisher ID, Name, and User ID are required.');
        return;
    }

    const publisher = {
        publisherID: parseInt(publisherId, 10),
        publisherName: name,
        userID: parseInt(userId, 10)
    };

    console.log('Updating publisher:', publisher);

    fetch(`${editPublisherUri}/${publisherId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publisher)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to update publisher');
        }
        console.log('Publisher updated successfully');
        window.location.href = 'addEditPublishers.html';
    }).catch(error => {
        console.error('Unable to update publisher.', error);
        alert('Failed to update publisher: ' + error.message);
    });
}
