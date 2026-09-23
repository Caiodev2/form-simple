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

    renderUsers();
}

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
                    <div>
                        <strong>${user.name[0].toUpperCase()}</strong>
                    </div>
                    
                    <strong>${user.name}</strong>
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