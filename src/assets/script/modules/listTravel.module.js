import { headerFetch } from "../../utils/headerFetch.js";

const URL = '/listTravel/';
const URLFORM = '/formulaire/';
export class ListTravel {
    _container = document.querySelector('#root');

    constructor() {
        const titleContainer = document.createElement('h1');
        titleContainer.innerHTML = 'Liste des Voyages';

        this._container.appendChild(titleContainer);

        this.fetchTravelList();
    }

    get target() {
        return this._target;
    }
    set target(value) {
        this._target = value;
    }

    // Fetch all travel list
    fetchTravelList() {
        fetch(URL, headerFetch('GET'))
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(res);
            }).then((response) => {

                const ulElement = document.createElement('ul');

                response.forEach(element => {
                    const imgElement = document.createElement('img');
                    const liElement = document.createElement('li');
                    const pElement = document.createElement('p');
                    const editButtonElement = document.createElement('button');
                    const deleteButtonElement = document.createElement('button');

                    liElement.innerText = element.name;
                    imgElement.src = element.img;
                    pElement.innerText = element.description;

                    editButtonElement.classList.add('edit_button');
                    editButtonElement.innerText = "editer";
                    editButtonElement.id = element._id;
                    this.editTravel(editButtonElement);

                    deleteButtonElement.classList.add('delete_button');
                    deleteButtonElement.innerText = "Supprimer";
                    deleteButtonElement.id = element._id;
                    this.deletetravel(deleteButtonElement);


                    liElement.appendChild(imgElement);
                    liElement.appendChild(pElement);
                    liElement.appendChild(editButtonElement);
                    liElement.appendChild(deleteButtonElement);

                    ulElement.appendChild(liElement);
                });
                this._container.appendChild(ulElement);
            }).catch((error) => {
                console.log('Error fetch /listTravel', error);
            });
    }

    // Edit Travel
    editTravel(editButton) {
        editButton.addEventListener('click', (event) => {
            fetch(URLFORM + event.target.id, headerFetch('GET'))
                .then((res) => {

                    if (res.ok) return res.json();
                    return Promise.reject(res);

                }).then((response) => {

                    localStorage.setItem('TRAVEL', JSON.stringify(response));
                    location.href = '/formulaire';

                }).catch((error) => {
                    console.log('Error fetch /listTravel/:id', error);
                });
        });
    }

    // Delete Travel
    deletetravel(deleteButton) {
        deleteButton.addEventListener('click', (event) => {
            fetch(URL + event.target.id, headerFetch('DELETE'))
                .then((res) => {
                    if (res.ok) return res.json();
                    return Promise.reject(res);
                }).then((response) => {
                    console.log(response);
                    location.href = '/liste';
                }).catch((error) => {
                    console.log('Error fetch /delete', error);
                })
        });
    }
}