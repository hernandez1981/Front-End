
const crearGraficar = (pEtiquetas, pDatos, pColores) => {
    // Obtener una referencia al elemento canvas del DOM
    const $grafica = document.querySelector("#grafica");

    const datos = {
        label: "Estadísticas",
        data: pDatos, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        backgroundColor: pColores, // Color de fondo
        borderColor: '#000', // Color del borde
        borderWidth: 1// Ancho del borde
    };

    new Chart($grafica, {
        type: 'bar',// Tipo de gráfica
        data: {
            labels: pEtiquetas,
            datasets: [
                datos
                // Aquí más datos...
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
///////////////////////////////
const getBg = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    return "#" + randomColor;
  }


//////////////////////////
const fetchBuscar = () => {
    const pokeNameInput = document.getElementById("pokeName");  
    const estadistica = document.getElementById("estadistica");
    const graficaR = document.getElementById("graficaR");
    const pokeId = document.querySelector('[data-poke-id]');       
    
       
    let pokeName = pokeNameInput.value;    
    pokeName = pokeName.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    let etiquetas = [];
    let dataGrafica = [];
    let colores = [];
    
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("assets/imgs/default.png")
            graficaR.style.display = 'none';
            pokeNameInput.value = '';
            pokeId.textContent = 'No se encontró información :C';  
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            graficaR.style.display = 'block';

            console.log(data);           
            let pokeImg = '';
            if ( data.sprites.other.dream_world.front_default ){
                pokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
            }else{
                pokeImg = data.sprites.front_default;
            }

            pokeImage(pokeImg);            
            console.log(pokeImg);             
            pokeId.textContent = `#00${data.id} - ${  data.name }`;  

            data.stats.forEach(stat => {
                etiquetas.push(stat.stat.name);
                dataGrafica.push(stat.base_stat);
                colores.push(  getBg() );
            });
            
            crearGraficar(etiquetas, dataGrafica, colores)          
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

