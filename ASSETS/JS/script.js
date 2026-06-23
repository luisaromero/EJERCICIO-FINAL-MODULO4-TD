const URL = "https://jsonplaceholder.typicode.com/users"

const getUsersButton = document.getElementById('btn-get-users')
const searchUserBasicInfo = document.getElementById('btn-search-user')
const searchUserAdress = document.getElementById('btn-get-address')
const searchUserAdvancedInfo = document.getElementById('btn-get-advanced-info')
const searchListOfCompanies = document.getElementById('btn-get-companies')
const orderUserNames = document.getElementById('btn-get-ordered-users')



class getUserData {
    constructor() {
        this.url = URL;
        this.users = [];
        this.getData();
    }

    getData() {
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo conectar')
                }
                return response.json()
            })

            .then(data => {
                this.users = data
                console.log({ data })
            })
            .catch(error => console.error('Error fetching data:', error));

    }

    getAllnames() {
        this.users.forEach(user => {
            console.log(user.name);
        });
    }

    getuserByName(name) {
        if (name.length > 0) {
            return this.users.find(
                user => user.name.toLowerCase() === name.toLowerCase()
            );
        }

        else {
            console.error('Ingrese un nombre de usuario válido')
        }
    }

    showUsernameAndEmail() {
        const promptSearchByname = prompt("Ingrese el nombre del usuario:");
        const nameUser = promptSearchByname.trim()

        const userFound = this.getuserByName(nameUser);

        if (userFound) {
            console.log("Username:", userFound.username);
            console.log("Correo:", userFound.email);
        } else {
            console.log("Usuario no encontrado");
        }
    }
    showUserAdress() {
        const promptSearchByname = prompt("Ingrese el nombre del usuario:");
        const nameUser = promptSearchByname.trim()
        const userFound = this.getuserByName(nameUser);

        if (userFound) {
            console.log("Dirección", userFound.address);

        } else {
            console.log("Usuario no encontrado");
        }

    }
    showUserAditionalInfo() {
        const promptSearchByname = prompt("Ingrese el nombre del usuario:");
        const nameUser = promptSearchByname.trim()
        const userFound = this.getuserByName(nameUser);
        if (userFound) {
            console.log("Teléfono", userFound.phone);
            console.log("Website", userFound.website);
            console.log("Datos de la Compañia", userFound.company);


        } else {
            console.log("Usuario no encontrado");
        }

    }


}

const _users = new getUserData();

getUsersButton.addEventListener("click", () => {
    _users.getData();
});
searchUserBasicInfo.addEventListener('click', () => {
    _users.showUsernameAndEmail();
})
searchUserAdress.addEventListener('click', () => {
    _users.showUserAdress()
})
searchUserAdvancedInfo.addEventListener('click', () => {
    _users.showUserAditionalInfo()
})