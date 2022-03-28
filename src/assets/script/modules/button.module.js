export class Button {
    _button;

    constructor(name, className, id) {
        this.button = document.createElement('button');
        this.button.innerText = name;
        this.button.classList.add(className);
        this.button.id = id


    }

    get button() {
        return this._button;
    }
    set button(value) {
        this._button = value;
    }
}