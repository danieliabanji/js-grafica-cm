"use strict";

// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

const playButton = document.getElementById('play');


function play(){

    const introText = document.getElementById('introText');
    introText.classList.add('d-none');

    console.log('inizio il gioco....');
    const NUM_BOMB = 16;
    const bombsPosition = [];

    let numCell;
    const fieldGame = document.getElementById('fieldGame');
    fieldGame.innerHTML = '';
    const levelInput = document.getElementById('livello');
    const level = levelInput.value;
    
    // selezione del livello di difficoltà
    switch(level){
        case '1':
        default:
            numCell = 100;
        break;
        case '2':
            numCell = 81;
        break;
        case '3':
            numCell = 49;
        break;
    }
    // funzioni che crea la bomba
    while(bombsPosition.length < NUM_BOMB){
        const bomb = randomNumber(1,numCell);
        if(!bombsPosition.includes(bomb)){
            bombsPosition.push(bomb);
        }
    }
    console.log(bombsPosition);
    // funzione che crea la cella
    function drawCell(num){
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide}`;
        cell.style.height = `calc(100% / ${cellPerSide}`;

        cell.innerHTML = `
            <span>${num}</span>
        `;
        cell.addEventListener('click', function(){
            if(bombsPosition.includes(num)){
                this.classList.add('red');
            } else {
                this.classList.add('blue');
            }
        })
        return cell;
    }

    // funzione che crea il campo di gioco
    function drawGrid(){
        const grid = document.createElement('div');
        grid.className = 'grid';

        for(let i = 1; i <= numCell; i++){
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        fieldGame.appendChild(grid);
    }
    drawGrid();
}

playButton.addEventListener('click', play);



// creare la casella bomba quando viene selezionata