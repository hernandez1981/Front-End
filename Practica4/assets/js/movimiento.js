const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName"); 
    const movimiento = document.getElementById("movimiento");
    const datosR = document.getElementById("datosR");    
    const tbody = document.getElementById("tbody");    
    
    const pokeId = document.querySelector('[data-poke-id]'); 
    let pokeName = pokeNameInput.value;
    
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("assets/imgs/default.png")
            datosR.style.display='none';
            pokeNameInput.value ='';
            pokeId.textContent = 'No se encontró información :( ';
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            
            datosR.style.display='block';
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
          
            //Movimientos
            
            let newBody = '';
            let i = 1;

            data.moves.forEach(move => {
                newBody = newBody +'<tr>';
                newBody += '<td>'+i+'</td>';
                newBody += '<td>'+ move.move.name +'</td>';
                newBody += '</tr>';
                i++;
            });

            tbody.innerHTML = newBody;            
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

