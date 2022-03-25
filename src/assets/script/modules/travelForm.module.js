import { headerFetch } from "../../utils/headerFetch.js";


const URL = '/addTravel';

export class TravelForm {
    _form = document.querySelector('.form');
    _destinationInput = document.querySelector('.destinationInput');
    _imageInput = document.querySelector('.imageInput');
    _descriptionInput = document.querySelector('.descriptionInput');

    constructor() {

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.sendNewTravel(this._destinationInput.value, this._imageInput.value, this._descriptionInput.value);
        })
    }

    sendNewTravel(destination, image, description) {

        const body = {
            destination,
            image,
            description,
        };

        const options = headerFetch('POST', body);

        fetch(URL, options)
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
}
