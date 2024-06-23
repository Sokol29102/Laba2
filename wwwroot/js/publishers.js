const publishersUri = 'api/Publishers';
let publishers = [];

function getPublishers() {
    fetch(publishersUri)
        .then(response => response.json())
        .then(data => displayPublishers(data))
        .catch(error => console.error('Unable to get publishers.', error));
}

function displayPublishers(data) {
    const tBody = document.getElementById('publishers');
    tBody.innerHTML = '';

    data.forEach(publisher => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(publisher.publisherID);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        textNode = document.createTextNode(publisher.publisherName);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);  // User ID column
        textNode = document.createTextNode(publisher.userID);
        td3.appendChild(textNode);
    });

    publishers = data;
}

function editPublisher() {
    const publisherId = document.getElementById('edit-publisher-id').value;
    const publisher = publishers.find(publisher => publisher.publisherID === parseInt(publisherId, 10));

    if (publisher) {
        window.location.href = `editPublisher.html?publisherId=${publisher.publisherID}&name=${publisher.publisherName}&userID=${publisher.userID}`;
    } else {
        alert('Publisher not found');
    }
}

function removePublisher() {
    const publisherId = document.getElementById('remove-publisher-id').value.trim();
    if (publisherId === '') {
        alert('Please enter a Publisher ID');
        return;
    }

    fetch(`${publishersUri}/${publisherId}`, {
        method: 'DELETE'
    })
        .then(() => {
            getPublishers();
            document.getElementById('remove-publisher-id').value = '';
        })
        .catch(error => console.error('Unable to remove publisher.', error));
}

document.addEventListener("DOMContentLoaded", getPublishers);
