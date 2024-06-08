const uri = 'api/Authors';
let authors = [];

function getAuthors() {
    fetch(uri)
        .then(response => response.json())
        .then(data => displayAuthors(data))
        .catch(error => console.error('Unable to get authors.', error));
}

function addAuthor() {
    window.location.href = 'addAuthor.html';
}

function editAuthor() {
    const authorId = document.getElementById('edit-author-id').value.trim();
    if (authorId === '') {
        alert('Please enter an Author ID');
        return;
    }
    fetch(`${uri}/${authorId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Author not found');
            }
        })
        .then(data => {
            window.location.href = `editAuthor.html?authorId=${authorId}&born=${data.born}&death=${data.death}`;
        })
        .catch(error => {
            alert(error.message);
        });
}

function removeAuthor() {
    const authorId = document.getElementById('remove-author-id').value.trim();
    if (authorId === '') {
        alert('Please enter an Author ID');
        return;
    }

    fetch(`${uri}/${authorId}`, {
        method: 'DELETE'
    })
        .then(() => {
            getAuthors();
            document.getElementById('remove-author-id').value = '';
        })
        .catch(error => console.error('Unable to remove author.', error));
}

function displayAuthors(data) {
    const tBody = document.getElementById('authors');
    tBody.innerHTML = '';

    data.forEach(author => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(author.authorID);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        textNode = document.createTextNode(author.born);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        textNode = document.createTextNode(author.death || '');
        td3.appendChild(textNode);

        let td4 = tr.insertCell(3);
        textNode = document.createTextNode(author.createdAt);
        td4.appendChild(textNode);

        let td5 = tr.insertCell(4);
        textNode = document.createTextNode(author.updatedAt);
        td5.appendChild(textNode);
    });

    authors = data;
}

document.addEventListener("DOMContentLoaded", getAuthors);
