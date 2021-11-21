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

        <div class="col-lg-4 d-block justify-content-start my-2 icono-wrap">
                <img src="${anime.image_url}"
                    alt="img" class="imag">
                <div>
                    <h3 class="fs-5 mt-4 px-2 pb-1">${anime.title}</h3>
                    <p class="px-4">${anime.synopsis}</p>
                </div>
            </div>
        `;

        mainContainer.innerHTML += animeCard;
    });
    
}

/* Event Lsiteners */
SearchBtn.addEventListener('click',() => Request(displayData));;