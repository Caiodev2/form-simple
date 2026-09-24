let userRegister = [];

function handleFormSubmit() {
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        return showMessage("O campo está vazio", 'error');
    }

    const newRegister = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRegister)
    })
    .then(response => {

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }

        return response.json();
    })
    .then(user => {

        console.log('Usuário cadastrado no backend:', user);

        showMessage('Usuário cadastrado!');

        nameInput.value = '';
        emailInput.value = '';
        nameInput.focus();

        renderUsers();
    })
    .catch(error => {

        console.error('Erro de conexão com o backend:', error);

        showMessage('Não foi possível conectar ao sever', 'error');
    });
}

/*
function renderUsers(){

    const listContent = document.getElementById("listContent");
    if(userRegister.length === 0){
        listContent.innerHTML  = "Nenhum cadastro realizado";
        return;
    }

    listContent.innerHTML = '';

    userRegister.forEach(user => {
        const userElement = document.createElement('div');

        userElement.innerHTML = `
            <div>
                <div class="user-perfil">
                    <div class="photo-perfil">
                        <strong>${user.name}</strong>
                    </div>

                    <div class="button-delete" onclick="deleteUser(${user.id})">
                        <img src="/form/frontend/src/assets/img/deletar.png" alt="icon-delete" style="height: 20px;">
                    </div>
                </div>
                
                <div>
                    <span>${user.email}</span>
                    <small>${user.data}</small>
                </div>
            </div>
        `;

        listContent.appendChild(userElement)
    });

}

*/ 

function removeRegister(){
    if (userRegister.length === 0) {
        return showMessage('Não há usuários ', "error")
    }
    userRegister = [];
    renderUsers();
}

function showMessage(text, tipo = 'success'){
    const box = document.getElementById('messageBox');
    box.textContent = text;
    if (tipo === 'success') {
        box.className = 'message_success'
    } else{
        box.className = 'message_error'
    }

    box.classList.remove('hidden');

    setTimeout(() => {
        box.classList.add('hidden');
    }, 4000);
}

function deleteUser(id) {
    userRegister = userRegister.filter(user => user.id !== id);

    renderUsers();
}