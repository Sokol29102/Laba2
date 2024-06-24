const findPublishersUri = 'api/Publishers/findByUserID';

function findPublishers() {
    const userId = document.getElementById('userId').value;

    if (!userId) {
        alert('Please enter a UserID.');
        return;
    }

    fetch(`${findPublishersUri}?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to find publishers');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Unable to find publishers.', error);
            alert('Failed to find publishers: ' + error.message);
        });
}

function displayResults(data) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    data.forEach(publisher => {
        const li = document.createElement('li');
        li.textContent = `PublisherID: ${publisher.publisherID}, PublisherName: ${publisher.publisherName}, UserID: ${publisher.userID}`;
        results.appendChild(li);
    });
}
