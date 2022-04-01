import { Button } from "./button.module.js";
import { PopModal } from "./popModal.js";

export class Modal {
    _modalContainer;

    constructor(ulElement, deleteFunc, rootContainer) {
        this.ulElement = ulElement;
        this.modalContainer = document.createElement('div');
        const deleteButton = new Button("Supprimer", 'modal_deleteButton');
        const closeButton = new Button("Retour", 'modal_closeButton');
        this.modalContainer.classList.add('modal_container');

        this.closeModal(closeButton._button, ulElement, rootContainer);
        this.deleteTravel(deleteButton._button, deleteFunc);


        this.modalContainer.appendChild(deleteButton._button);
        this.modalContainer.appendChild(closeButton._button);
    }

    get modalContainer() {
        return this._modalContainer;
    }
    set modalContainer(value) {
        this._modalContainer = value;
    }

    closeModal(closeButton, ulElement, rootContainer) {
        closeButton.addEventListener('click', () => {
            new PopModal('Supréssion annulé !', rootContainer);
            ulElement.removeChild(this.modalContainer);
        })
    }

    deleteTravel(deleteButton, deleteFunc) {
        deleteButton.addEventListener('click', () => {
            deleteFunc();
        })
    }

}