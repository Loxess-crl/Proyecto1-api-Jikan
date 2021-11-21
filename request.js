"use strict";

/* Elements */

const mainContainer = document.querySelector('#container');
const btnLoadContent = document.querySelector('#mascontenido');
const containerBtn = document.querySelector('.container__button-hide');
const SearchBtn = document.querySelector('#busc');


/* Request Function */

const Request = async (callback) => {
    let titulo = document.getElementById('aname').value;
    let url = `https://api.jikan.moe/v3/search/anime?q=${titulo}&limit=7`;

    try{
        let response = await fetch(url);
            response = await response.json();

        callback(response);

    } catch(error) {
        throw new Error(error);
    } 
}


function displayData({results}) {
 
    containerBtn.style.display = 'none';

    results.forEach( anime => {

        const animeCard = `
        <div class="box">
            <div class="imgbox">
                <img src="${anime.image_url}" alt="imagen">
            </div>
            <div class="details">
                <div class="content" id="content">
                    <h2>${anime.title}</h2>
                    <p>${anime.synopsis}</p>
                </div>
            </div>
        </div>
        `;

        mainContainer.innerHTML += animeCard;
    });
    
}

/* Event Lsiteners */
SearchBtn.addEventListener('click',() => Request(displayData));;