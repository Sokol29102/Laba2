const usersUri = 'api/Users';
let users = [];

function getUsers() {
    fetch(usersUri)
        .then(response => response.json())
        .then(data => displayUsers(data))
        .catch(error => console.error('Unable to get users.', error));
}

function displayUsers(data) {
    const tBody = document.getElementById('users');
    tBody.innerHTML = '';

    data.forEach(user => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodeUserID = document.createTextNode(user.userID);
        td1.appendChild(textNodeUserID);

        let td2 = tr.insertCell(1);
        let textNodeLogin = document.createTextNode(user.login);
        td2.appendChild(textNodeLogin);

        let td3 = tr.insertCell(2);
        let textNodeEmail = document.createTextNode(user.email);
        td3.appendChild(textNodeEmail);

        let td4 = tr.insertCell(3);
        let textNodeCreatedAt = document.createTextNode(user.createdAt);
        td4.appendChild(textNodeCreatedAt);

        let td5 = tr.insertCell(4);
        let textNodeUpdatedAt = document.createTextNode(user.updatedAt);
        td5.appendChild(textNodeUpdatedAt);
    });

    users = data;
}

function editUser() {
    const userId = document.getElementById('edit-user-id').value;
    const user = users.find(user => user.userID === parseInt(userId, 10));

    if (user) {
        window.location.href = `editUser.html?userID=${user.userID}&login=${user.login}&email=${user.email}`;
    } else {
        alert('User not found');
    }
}
