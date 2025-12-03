import { renderCardsToView } from "./LoadResources.js";
import { ContainerListener } from "./Listeners.js";

document.addEventListener("DOMContentLoaded", async () => {
    ContainerListener();
    await renderCardsToView();


});