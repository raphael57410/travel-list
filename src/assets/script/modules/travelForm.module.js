import { headerFetch } from "../../utils/headerFetch.js";


const ADD_URL = '/addTravel';
const UPDATE_URL = '/updateTravel';

export class TravelForm {
    _form = document.querySelector('.form');
    _id;
    _destinationInput = document.querySelector('.destinationInput');
    _imageInput = document.querySelector('.imageInput');
    _descriptionInput = document.querySelector('.descriptionInput');
    _formButton = document.querySelector('.form_button');

    constructor() {
        this._formButton.innerText = 'Ajouter le voyage';

        const itemParse = JSON.parse(localStorage.getItem('TRAVEL'));
        if (itemParse) {
            this._id = itemParse._id;
            this._destinationInput.value = itemParse.name;
            this._imageInput.value = itemParse.img;
            this._descriptionInput.value = itemParse.description;
            this._formButton.innerText = 'éditer le voyage';
        }

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (itemParse) {
                this.updateTravel(this._id, this._destinationInput.value, this._imageInput.value, this._descriptionInput.value);
            } else {
                this.sendNewTravel(this._destinationInput.value, this._imageInput.value, this._descriptionInput.value);
            }


        })
    }

    sendNewTravel(destination, image, description) {
        const body = {
            destination,
            image,
            description,
        };

        const options = headerFetch('POST', body);

        fetch(ADD_URL, options)
            .then((res) => {

                if (res.ok) return res;

                return Promise.reject(res);
            })
            .then((response) => {
                console.log(response);
                location.href = '/liste';
            })
            .catch((error) => {
                console.log('Error fetch /addTravel', error);
            });

    }

    updateTravel(id, destination, image, description) {
        const body = {
            id,
            destination,
            image,
            description,
        };

        const options = headerFetch('PATCH', body);

        fetch(UPDATE_URL, options).then((res) => {

            if (res.ok) return res.json();
            return Promise.reject(res);

        }).then((response) => {
            localStorage.removeItem('TRAVEL');
            location.href = '/liste';
        }).catch((error) => {
            console.log('Error fetch update', error);
        });
    }
}
