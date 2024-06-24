const editUserUri = 'api/Users';

document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('userID');
    const login = urlParams.get('login');
    const email = urlParams.get('email');

    document.getElementById('user-id').value = userID;
    document.getElementById('login').value = login;
    document.getElementById('email').value = email;
});

function updateUser() {
    const userID = document.getElementById('user-id').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    const user = {
        userID: parseInt(userID, 10),
        login: login,
        password: password,
        email: email
    };

    fetch(`${editUserUri}/${userID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            window.location.href = 'addEditUsers.html';
        })
        .catch(error => console.error('Unable to update user.', error));
}
