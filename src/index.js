import "./index.html";
import "./style.scss";

import { App } from "./modules/app";
import { events } from "./modules/events";

const body = document.querySelector("body");
if (!localStorage.getItem("language")) localStorage.setItem("language", "En");
const app = new App(body);

app.render();
events();
