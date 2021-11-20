"use strict";

/* Elements */

const mainContainer = document.querySelector('#container');
const btnLoadContent = document.querySelector('#mascontenido');
const containerBtn = document.querySelector('.container__button-hide');

let URL = 'https://api.jikan.moe/v3/search/anime?q=clannad&limit=7';

/* Request Function */

const Request = async (url, callback) => {
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
btnLoadContent.addEventListener('click',() => Request(URL, displayData));;