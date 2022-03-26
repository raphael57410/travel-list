import { headerFetch } from "../../utils/headerFetch.js";


const ADD_URL = '/addTravel';
const UPDATE_URL = '/updateTravel';

export class TravelForm {
    _form = document.querySelector('.form');
    _id;
    _destinationInput = document.querySelector('.destinationInput');
    _imageInput = document.querySelector('.imageInput');
    _descriptionInput = document.querySelector('.descriptionInput');

    constructor() {

        const itemParse = JSON.parse(localStorage.getItem('TRAVEL'));
        const item = itemParse[0];

        if (item) {
            console.log(item.name, item.img, item.description);
            this._id = item.id;
            this._destinationInput.value = item.name;
            this._imageInput.value = item.img;
            this._descriptionInput.value = item.description;
        }

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (item) {
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
            console.log(response);
            localStorage.removeItem('TRAVEL');
        }).catch((error) => {
            console.log('Error fetch update', error);
        });
    }
}
