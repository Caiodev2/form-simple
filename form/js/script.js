let userRegister = [];

function handleFormSubmit() {
    
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')

    const newRegister = {
        id: Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        data: new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };


    userRegister.push(newRegister);

    nameInput.value = '';
    emailInput.value = '';
    nameInput.focus();
}