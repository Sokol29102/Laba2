function addUser() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    const user = {
        login: login,
        password: password,
        email: email
    };

    fetch(usersUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(() => {
            window.location.href = 'addEditUsers.html';
        })
        .catch(error => console.error('Unable to add user.', error));
}
