import { Home } from './modules/home.module.js';

const target = document.querySelector('#root');

const home = new Home(target);

console.log(home);