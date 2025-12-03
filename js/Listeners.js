import {RenderCardsAgain} from "./LoadResources.js"

function ContainerListener(){
    let MainConteiner = document.querySelector(".container");
    MainConteiner.addEventListener( "click",(event) => {
        event.preventDefault();
        HandlerTagsEvents(event)
    });
}

function HandlerTagsEvents(event){
    let tag = event.target.tagName;
    console.log("tag: "+tag)
    switch (tag) {
        case "IMG":
            console.log("Es una imagen");
            break;
        case "DIV":
            console.log("Es un div");
            CompareBothImagesAreEqual(event)
            break;
        case "INPUT":
            console.log("Es un input");
            break;
        case "BUTTON":
            console.log("Es un botón");
            break;
        default:
            console.log("Otro tipo:", tag);
    }
}

export {ContainerListener}

function CompareBothImagesAreEqual(event){
    let KeyFirstClick = "FirstClick"
    let firstClickElement = RecoverInfoFromLocalStorage(KeyFirstClick)
    let historico = RecoverInfoFromLocalStorage("historico")
    let matches = RecoverInfoFromLocalStorage("matches")
    let idCard = event.target.dataset.id
    event.target.querySelector("img").style.visibility = "visible";

    if(!firstClickElement){
        console.log("no hay items en local storage")
        let obj = 
        [
            {
                "id-card":idCard,
                "revelado":true
            }
        ]
        SaveInfoFromLocalStorage(KeyFirstClick,obj)
        return false;
    }
    
    let ultimoElemento = (historico == null) ? firstClickElement[firstClickElement.length -1] : historico[historico.length-1]
    let obj2 = 
    [
        ultimoElemento,
        {
            "id-card":idCard,
            "revelado":true
        }
    ]
    SaveInfoFromLocalStorage("historico",obj2)
    if(ultimoElemento["id-card"] == idCard){
        let arrDivs = Array.from(document.querySelectorAll("div.item"))

        let showedArr = arrDivs.filter( (x) => x.dataset.id == ultimoElemento["id-card"])
        showedArr.forEach( (el) => {
            el.querySelector("img").style.visibility = "visible";
        })
        matches = matches != null ? matches : [];
        matches.push(ultimoElemento)
        SaveInfoFromLocalStorage("matches",matches)
    }else{
        event.target.querySelector("img").style.visibility = "visible";
        //voltear las cartas despues de 1.5 seg
        setTimeout(() => {
            let arrDivs = Array.from(document.querySelectorAll("div.item"))

            let showedArr = arrDivs.filter( (x) => x.dataset.id == idCard || 
                                                    x.dataset.id == ultimoElemento["id-card"])
            showedArr.forEach( (el) => {
                el.querySelector("img").style.visibility = "hidden";
            })
        }, 700);

    }
    DeleteInfoFromLocalStorage("historico")
    DeleteInfoFromLocalStorage("FirstClick")

}

const render = async (id) => {
        const revelables = await obtenerCartasRevelables(id);
        RenderCardsAgain(revelables)
    };

async function obtenerCartasRevelables(idCard) {
    const res = await fetch('./assets/fakeDb/cards.json');
    let cartas = await res.json();
    cartas = [...cartas ,...cartas]

    // 1. Filtrar las que NO están reveladas
    const revelables = cartas.filter(carta => carta.revelado === false);

    // 2. Cambiarles el estado a revelado (si quieres modificar)
    revelables.forEach(carta => {
        if(carta["id-card"] == idCard){
            carta.revelado = true;
        }
    });

    // 3. Devolver las que sí pueden ser reveladas
    return revelables;
}

function RecoverInfoFromLocalStorage(key){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function SaveInfoFromLocalStorage(key,obj){
    localStorage.setItem(key, JSON.stringify(obj));
}

function DeleteInfoFromLocalStorage(key){
    localStorage.removeItem(key);
}