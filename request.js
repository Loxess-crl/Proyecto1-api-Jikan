"use strict";

/* Elements */

const mainContainer = document.querySelector('#container');
const SearchBtn = document.querySelector('#busc');


/* Request Function */

const Request = async (callback) => {
    let titulo = document.getElementById('nombreAnime').value;
    let url = `https://api.jikan.moe/v3/search/anime?q=${titulo}&limit=6`;

    try{
        let response = await fetch(url);
            response = await response.json();

        callback(response);

    } catch(error) {
        throw new Error(error);
    } 
}


function displayData({results}) {
 
    mainContainer.innerHTML = ' ';

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