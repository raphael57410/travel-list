import { headerFetch } from "../../utils/headerFetch.js";

const URL = '/listTravel'
export class ListTravel {
    _container = document.querySelector('#root');;
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

                    liElement.innerText = element.name;
                    imgElement.src = element.img;
                    pElement.innerText = element.description;
                    liElement.appendChild(imgElement);
                    liElement.appendChild(pElement);
                    ulElement.appendChild(liElement);
                });

                this._container.appendChild(ulElement);
            }).catch((error) => {
                console.log('Error fetch /listTravel', error);
            });
    }
}

new ListTravel();