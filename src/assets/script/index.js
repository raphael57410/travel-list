import { ListTravel } from "./modules/listTravel.module.js";
import { TravelForm } from "./modules/travelForm.module.js";

const urlLocation = window.location.pathname;


if (urlLocation === '/pages/listTravel.html') {

    const listTravelInstance = new ListTravel();
    listTravelInstance;
}


if (urlLocation === '/pages/travelForm.html') {

    const travelFormInstance = new TravelForm();
    travelFormInstance;
}
