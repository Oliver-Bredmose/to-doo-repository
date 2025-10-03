import {makeListsView} from "./modules/View.js";
import { initapp } from "./modules/Controller.js";
import { GetDarkmode } from "./modules/module.js";
// #region GLOBALS


const addButton = document.getElementById('addButton');

// #endregion GLOBALS

initapp()
GetDarkmode();