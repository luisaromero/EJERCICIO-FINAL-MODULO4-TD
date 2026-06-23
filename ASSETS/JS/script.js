const URL = "https://jsonplaceholder.typicode.com/users"

const getUsersButton = document.getElementById('btn-get-users')

getUsersButton.addEventListener('click', () => {
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo conectar')
            }
            return response.json()
        })

        .then(data => {
            charactersData = data;
            console.log({ data })
        })
        .catch(error => console.error('Error fetching data:', error));
});