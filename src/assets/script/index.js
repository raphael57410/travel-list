import { Home } from "./modules/home.module.js";
import { ListTravel } from "./modules/listTravel.module.js";
import { TravelForm } from "./modules/travelForm.module.js";

const urlLocation = window.location.pathname;

if (urlLocation === '/') {
    new Home();
}

if (urlLocation === '/liste') {

    new ListTravel();
}


if (urlLocation === '/formulaire') {

    new TravelForm();
}
