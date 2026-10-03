loadUsers();


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

        loadUsers();

    })
    .catch(error => {

        console.error('Erro de conexão com o backend:', error);

        showMessage('Não foi possível conectar ao sever', 'error');
    });
}

async function loadUsers() {
    const response = await fetch('http://localhost:8080/users')
    

    const users = await response.json();
    console.log(users)
    renderUsers(users);

    document.getElementById('registered-count').textContent =
        `${users.length} cadastrados`;
}

function renderUsers(users){

    const listContent = document.getElementById("listContent");

    if(users.length === 0){
        listContent.innerHTML  = "Nenhum cadastro realizado";
        return;
    }

    listContent.innerHTML = '';

    users.forEach(user => {

        const userElement = document.createElement('div');
        const firstLetter = user.name.charAt(0).toUpperCase();

        userElement.innerHTML = `
            <div class="user-perfil">

                <div class="user-info">
                    <div class="photo-perfil">
                        <strong>${firstLetter}</strong>
                    </div>

                    <div class="user-data">
                        <strong>${user.name}</strong>
                        <span>${user.email}</span>
                        <small>${formatDate(user.registrationDate)}</small>
                    </div>
                </div>

                <div class="button-delete" onclick="deleteUser(${user.id})">
                    🗑️
                </div>

        </div>
        `;

        listContent.appendChild(userElement)
    });

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

function formatDate(date){
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('pt-br')
}

/*
function removeRegister(){
    if (userRegister.length === 0) {
        return showMessage('Não há usuários ', "error")
    }
    userRegister = [];
    renderUsers();
}



*/

async function deleteUser(id) {
    const response = await fetch(`http://localhost:8080/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        loadUsers();
    }
    
}