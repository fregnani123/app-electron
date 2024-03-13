const spanAlert = document.querySelector('.alert');
const msgAlert = document.querySelector('.msg');
const btnAlert = document.querySelector('#bottonAlert');

btnAlert.addEventListener('click',criaAlert)

function criaAlert(msg) {
    
    spanAlert.classList.toggle('alertDisplay')
    msgAlert.innerText = msg;
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

   

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        

        // Verifica as credenciais
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'adm' && password === 'adm') {
            window.location.href = '../public/controllers.html'; // Redireciona para a página Home
        } else {
            const msg = 'Credenciais inválidas. Tente novamente.';
            criaAlert(msg)
        }
    });
});