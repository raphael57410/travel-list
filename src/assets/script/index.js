import { ListTravel } from "./modules/listTravel.module.js";
import { TravelForm } from "./modules/travelForm.module.js";

const urlLocation = window.location.pathname;

if (urlLocation === '/liste') {

    const listTravelInstance = new ListTravel();
    listTravelInstance;
}


if (urlLocation === '/formulaire') {

    const travelFormInstance = new TravelForm();
    travelFormInstance;
}
