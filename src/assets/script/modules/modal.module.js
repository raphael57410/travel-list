import { Button } from "./button.module.js";

export class Modal {
    _modalContainer;

    constructor(ulElement) {
        this.ulElement = ulElement;
        this.modalContainer = document.createElement('div');
        const deleteButton = new Button("Supprimer");
        const closeButton = new Button("Retour");
        this.modalContainer.classList.add('modal_container');

        this.closeModal(closeButton._button, ulElement);

        this.modalContainer.appendChild(deleteButton._button);
        this.modalContainer.appendChild(closeButton._button);
    }

    get modalContainer() {
        return this._modalContainer;
    }
    set modalContainer(value) {
        this._modalContainer = value;
    }

    closeModal(closeButton, ulElement) {
        closeButton.addEventListener('click', () => {
            ulElement.removeChild(this.modalContainer);
        })
    }

}