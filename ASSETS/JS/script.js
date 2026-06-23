const URL = "https://jsonplaceholder.typicode.com/users"

const getUsersButton = document.getElementById('btn-get-users')
const searchByName = document.getElementById('btn-search-user')



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


}

const _users = new getUserData();

getUsersButton.addEventListener("click", () => {
    _users.getData();
});
searchByName.addEventListener('click', () => {
    _users.showUsernameAndEmail();
})