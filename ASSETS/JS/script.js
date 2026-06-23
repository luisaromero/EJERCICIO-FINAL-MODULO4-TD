const URL = "https://jsonplaceholder.typicode.com/users"

const getUsersButton = document.getElementById('btn-get-users')
const searchUserBasicInfo = document.getElementById('btn-search-user')
const searchUserAdress = document.getElementById('btn-get-address')
const searchUserAdvancedInfo = document.getElementById('btn-get-advanced-info')
const searchListOfCompanies = document.getElementById('btn-get-companies')
const orderUserNames = document.getElementById('btn-get-ordered-users')
const results = document.getElementById("results");



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
        const allNames = this.users.map(user => ({
            'Nombre de usuario': user.name,
        }));
        return allNames
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
        console.log({ userFound })
        if (userFound) {
            const aditionalInfo = {
                "Nombre de Usuario": userFound.name,
                "Teléfono": userFound.phone,
                "Website": userFound.website,
                "Datos de la Compañia": userFound.company
            }
            return aditionalInfo


        } else {
            console.log("Usuario no encontrado");
        }

    }
    showCompanies() {
        const companies = this.users.map(user => ({
            Compañia: user.name,
            Frase: user.company.catchPhrase
        }));
        return companies
    }
    orderedUserNames() {
        const orderedNames = this.users.map(user => ({
            'Nombre de usuario': user.name,
        }));
        return orderedNames
    }


}

const renderNames = (items) => {
    console.log(items)
    results.replaceChildren();

    items.forEach(item => {
        const block = document.createElement("div");

        Object.entries(item).forEach(([key, value]) => {
            const line = document.createElement("p");

            const label = document.createElement("strong");
            label.textContent = `${key}: `;

            const text = document.createElement("span");
            text.textContent = value;

            line.appendChild(label);
            line.appendChild(text);
            block.appendChild(line);
        });

        results.appendChild(block);
    });
}

function renderObject(obj) {
    results.replaceChildren();
    Object.entries(obj).forEach(([key, value]) => {
        const line = document.createElement("p");
        line.textContent = `${key}: ${value}`;
        results.appendChild(line);
    });
}

const _users = new getUserData();

getUsersButton.addEventListener("click", () => {
    const allNames = _users.getAllnames()
    renderNames(allNames);
});
searchUserBasicInfo.addEventListener('click', () => {
    _users.showUsernameAndEmail();
})
searchUserAdress.addEventListener('click', () => {
    _users.showUserAdress()
})
searchUserAdvancedInfo.addEventListener('click', () => {
    const aditionalInfo = _users.showUserAditionalInfo()
    renderObject(aditionalInfo);
})
searchListOfCompanies.addEventListener('click', () => {
    const companies = _users.showCompanies()
    renderNames(companies);
})
orderUserNames.addEventListener('click', () => {
    const orderedNames = _users.orderedUserNames()
    renderNames(orderedNames)
})