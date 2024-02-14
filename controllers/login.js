
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Verifica as credenciais
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'adm' && password === 'adm') {
            window.location.href = './controllers.html'; // Redireciona para a página Home
        } else {
            alert('Credenciais inválidas. Tente novamente.');
        }
    });
});