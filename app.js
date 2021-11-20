'use strict'

window.addEventListener('load', () => {
    let container = document.querySelector('#container');
    let limit = 7;

    let botonBorrar = document.querySelector('#mascontenido');
    
    function crearElementos(tipo, clase = "", atributes = null){
        var elemento = document.createElement(tipo);
        if(clase != ""){
            elemento.className = clase;
        }

        if(atributes != null){
            elemento.setAttribute(atributes[0],atributes[1] );
        }
        return elemento;
    }
    // CrearElementos('tagName', 'Class', 'atributos')
    // Esta funcion crea Elementos html con tres parametros
    // primero recibe el nombre de la etiqueta(obligatoria)
    // segundo puedes agregar una clase para el CSS(opcional)
    // tercero puedes asignarle un atributo href,src,etc(opcional)

    function meter(contenedor, hijos = Array(), nietos = Array()){
        if(hijos != ""){
            contenedor.append(hijos[0]);
            if(hijos.length > 1){
                for(let i = 0; i < hijos.length; i++){
                    contenedor.append(hijos[i]);
                }
            }
        }
        if(nietos != ""){
            let posicion = nietos[0]-1;
            for(let y = 1; y < nietos.length; y++){
                hijos[posicion].append(nietos[y]);     
            }       
        }
        return contenedor
    }
    // meter('main', 'second','third')
    // con esta funcion puedes meter divs dentro de otros divs
    // primer parametro div principal
    // segundo div hijo de principal>hijo
    // tercero div hijo de div hijo principal>hijo>nieto 
    // let div = crearElementos('div','clase',['id','prueba']);

    botonBorrar.addEventListener('click', function(){
        let borrar = document.querySelector('.botondiv');
        let padre = borrar.parentNode;
        padre.removeChild(borrar);
    
        fetch('https://api.jikan.moe/v3/search/anime?q=konosuba&limit='+limit)
        .then(data=> data.json())
        .then(data =>{
            // console.log(data)
            for(let i = 0; i < data.results.length; i++){
                let img = crearElementos('img','',['src',data.results[i].image_url]);

                let imgbox = crearElementos('div', 'imgbox');
                imgbox.append(img);

                let box = crearElementos('div', 'box')

                let details= crearElementos('div','details');
                let content= crearElementos('div','content');
                
                let h2 = crearElementos('h2');
                meter(h2,data.results[i].title);

                let p = crearElementos('p');
                meter(p,data.results[i].synopsis)
                meter(details,[content],[1,h2,p]);            

                meter(container,[box],[1, imgbox,details]);
            }
        });
    });

});