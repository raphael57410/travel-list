import { headerFetch } from "../../utils/headerFetch.js";
import { Button } from "./button.module.js";
import { Modal } from "./modal.module.js";

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
                const footerElement = document.createElement('footer');
                footerElement.innerText = 'Made by Raphael 😍';

                response.forEach(element => {
                    const imgElement = document.createElement('img');
                    const liElement = document.createElement('li');
                    const pElement = document.createElement('p');
                    const editButtonElement = new Button("editer", 'edit_button', element._id);
                    const deleteButtonElement = new Button("Supprimer", 'delete_button', element._id);

                    liElement.innerText = element.name;
                    imgElement.src = element.img;
                    pElement.innerText = element.description;

                    this.editTravel(editButtonElement.button);

                    this.deletetravel(deleteButtonElement.button, ulElement);

                    liElement.appendChild(imgElement);
                    liElement.appendChild(pElement);
                    liElement.appendChild(editButtonElement.button);
                    liElement.appendChild(deleteButtonElement.button);

                    ulElement.appendChild(liElement);
                });
                this._container.appendChild(ulElement);
                this._container.appendChild(footerElement);
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
    deletetravel(deleteButton, ulElement) {
        deleteButton.addEventListener('click', (event) => {
            const test = new Modal(ulElement);
            console.log(test._modalContainer);
            ulElement.appendChild(test._modalContainer);
            // fetch(URL + event.target.id, headerFetch('DELETE'))
            //     .then((res) => {
            //         if (res.ok) return res;
            //         return Promise.reject(res);
            //     }).then((response) => {
            //         console.log(response);
            //         location.href = '/liste';
            //     }).catch((error) => {
            //         console.log('Error fetch /delete', error);
            //     })
        });
    }
}