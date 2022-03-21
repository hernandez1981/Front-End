const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");       
    const tipoPokemon = document.getElementById("tipoPokemon");
    const estadistica = document.getElementById("estadistica");
    const movimiento = document.getElementById("movimiento");
    const habilidad = document.getElementById("habilidad");
    const especie = document.getElementById("especie");
    const datosR = document.getElementById("datosR");
    const pokeId = document.querySelector('[data-poke-id]');       
    
       
    let pokeName = pokeNameInput.value;
    
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("assets/imgs/default.png")
            datosR.style.display='none';
            pokeId.textContent = "Sin resultados :( ";
            pokeNameInput.value='';
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

            //Especies
            if (especie)
                especie.innerHTML = '<strong class="text-mayus">'+data.species.name+'</strong>';

            //Habilidades
            if (data.abilities.length > 1) {
                var lista='';                
                var i =1;
                data.abilities.forEach(ability => {                    
                    lista = lista + '<span class="badge bg-danger" >'+ i + ' - ' + ability.ability.name + '</span> ';
                    i++;
                });                
                habilidad.innerHTML = lista;
            } else {
                habilidad.innerHTML = '<strong>'+data.abilities[0].ability.name+'</strong>';
            }           
           
            // Tipo Pokemon
            if (data.types.length > 1) {
                var lista='';
                lista = '<ol class="list-group list-group-numbered">'
                data.types.forEach(type => {
                    lista = lista + '<li class="badge bg-info text-mayus">'+ type.type.name + '</li>';
                });
                lista = lista +  '</ul>';
                tipoPokemon.innerHTML = lista;
            } else {
                tipoPokemon.innerHTML = '<strong class="badge bg-info text-mayus">'+data.types[0].type.name+'</strong>';
            }
           
            //Movimientos
            if (data.moves.length > 1) {
                var lista='';                
                var i =1;             
                data.moves.forEach(move => {                   
                    lista = lista + '<span class="badge bg-success" >'+ i +' - '+ move.move.name + '</span> ';
                    i++;
                });                
                movimiento.innerHTML = lista;
            } else {
                movimiento.innerHTML = '<strong">'+data.moves[0].move.name+'</strong>';
            }            
            
            //Estadísticas
            if (data.stats.length > 1) {
                var lista='';               
                var i =1;
                data.stats.forEach(stat => {                   
                    lista = lista + '<span class="badge bg-secondary" >'+ i +' - '+ stat.stat.name +' / ' + stat.base_stat  + '</span> ';
                    i++;
                });                
                estadistica.innerHTML = lista;
            } else {
                estadistica.innerHTML = '<strong>'+data.stats[0].stat.name+'</strong>';
            }  
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

