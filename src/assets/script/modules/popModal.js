
export class PopModal {
    _popModalContainer;

    constructor(message, rootContainer) {
        this.modalContainer = document.createElement('div');
        this.modalContainer.innerText = message;
        this.modalContainer.classList.add('popModal_container');

        rootContainer.appendChild(this.modalContainer);

        setTimeout(() => {
            rootContainer.removeChild(this.modalContainer);
        }, 2000);

    }

    get popModalContainer() {
        return this._popModalContainer;
    }
    set popModalContainer(value) {
        this._popModalContainer = value;
    }
}