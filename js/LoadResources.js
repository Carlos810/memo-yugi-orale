
async function LoadCardsFromResources(){
    debugger;
    let cartasDuplicadas = null
    

    const loadCartas = await fetch('./assets/fakeDb/cards.json'); 
    let cartas = await loadCartas.json();

    // Duplicar cartas para hacer pares en el memorama
    cartasDuplicadas = [...cartas, ...cartas];

    // Mezclar cartas aleatoriamente usando sort()
    cartasDuplicadas.sort(() => Math.random() - 0.5);
    return cartasDuplicadas;
}

async function renderCardsToView(){
// Insertar cartas en el ContenedorTablero
    let cartasDuplicadas = await LoadCardsFromResources();
    const ContenedorTablero = document.querySelector(".Tablero");
    
    cartasDuplicadas.forEach((carta) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.setAttribute("data-id",carta["id-card"]);
        div.setAttribute('style', 'background-image: url("https://www.dropbox.com/scl/fi/e5ddp7x6t1w72y3odyoum/Card_Back.jpg?rlkey=18ig3x6gurjc7i6g3axblbomp&st=78xlfnkj&raw=1"); background-size: cover; background-position: center; background-repeat: no-repeat;');
        
        const img = document.createElement("img");
        img.src = carta["card-path"];
        img.alt = carta.name;
        // img.style.visibility = "hidden";

        div.appendChild(img);
        ContenedorTablero.appendChild(div);
    });
}

export {renderCardsToView};

