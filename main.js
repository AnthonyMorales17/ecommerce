const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginIn = document.getElementById('login-in'),
    loginUp = document.getElementById('login-up');

// Función de validación genérica
const validateForm = (inputs) => {
    const missingFields = [];
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            // Agregar clase de error al input
            input.parentElement.style.border = '2px solid #ff4757';
            missingFields.push(input.placeholder);
        } else {
            // Remover clase de error
            input.parentElement.style.border = '';
        }
    });

    if (missingFields.length > 0) {
        alert(`Por favor complete: ${missingFields.join(', ')}`);
        return false;
    }
    return true;
};

// Validación Login
document.querySelector('#login-in .login__button').addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('#login-in .login__input');
    
    if (validateForm(inputs)) {
        window.location.href = 'page.html'; // Redirección
    }
});

// Validación Registro
document.querySelector('#login-up .login__button').addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('#login-up .login__input');
    
    if (validateForm(inputs)) {
        window.location.href = 'page.html'; // Redirección
    }
});

signUp.addEventListener('click', (e) => {
    e.preventDefault();
    loginIn.classList.remove('block');
    loginIn.classList.add('none');
    loginUp.classList.remove('none');
    loginUp.classList.add('block');
});

signIn.addEventListener('click', (e) => {
    e.preventDefault();
    loginIn.classList.remove('none');
    loginIn.classList.add('block');
    loginUp.classList.remove('block');
    loginUp.classList.add('none');
});