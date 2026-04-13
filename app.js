//variable global
var pokemonActual = null;

// Buscar Pokémon
function searchPokemon(){
    document.getElementById("favorite-ones").disabled = false;
    var nombre =
        document.getElementById("pokemonInput")
        .value
        .toLowerCase(); 
    var url =
        "https://pokeapi.co/api/v2/pokemon/" +
        nombre;
        console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            pokemonActual = {
                nombre: data.name,
                imagen: data.sprites.front_default,
                tipos: data.types,
                altura: data.height,
                peso: data.weight,
                habilidades: data.abilities,
                stats: data.stats
            };
            mostrarPokemon();
        })
        .catch(function () {
            alert("Pokémon no encontrado");
        });
    }
    function mostrarPokemon() {
    var resultado =
        document.getElementById("resultado");
    var tipos = "";
    pokemonActual.tipos.forEach(function(t) {
        tipos +=
        "<p>Tipo: " +
        t.type.name +
        "</p>";
    });
    var habilidades = "";
    pokemonActual.habilidades.forEach(function(h) {
        habilidades +=
        "<p>Habilidad: " +
        h.ability.name +
        "</p>";
    });
    var stats = "";
    pokemonActual.stats.forEach(function(s) {
        stats +=
        "<p>" +
        s.stat.name +
        ": " +
        s.base_stat +
        "</p>";
    });
    resultado.innerHTML =
        "<div class='card'>" +
        "<h3>" +
        pokemonActual.nombre +
        "</h3>" +
        "<img src='" +
        pokemonActual.imagen +
        "'>" +
        tipos +
        "<p>Altura: " +
        pokemonActual.altura +
        "</p>" +
        "<p>Peso: " +
        pokemonActual.peso +
        "</p>" +
        habilidades +
        "<h4>Stats:</h4>" +
        "<div class='stats'>" +
        stats +
        "</div>" +
        "</div>";
}
function saveFavorite(pokemonInfo) {
    let list_favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let favoritesSet = new Set(list_favorites);
    favoritesSet.add(pokemonInfo);
    localStorage.setItem("favorites", JSON.stringify([...favoritesSet]));
    favoritesList()
}
document.getElementById("favorite-ones").addEventListener("click", () => { if (pokemonActual) { saveFavorite(pokemonActual);
    document.getElementById("favorite-ones").disabled = true;
 } });

function favoritesList(){
    let list_favorites = JSON.parse(localStorage.getItem("favorites"));
    const favorito = document.getElementById("favoritos")
    let divCard = document.createElement("div")
    for (pokemonActual in list_favorites){
    divCard.className = "tarjetas"
    console.log(pokemonActual)
    divCard.innerHTML = `<div class='card'>
        <h3>
        ${list_favorites[pokemonActual].nombre}
        </h3>
        <img src='
        ${list_favorites[pokemonActual].imagen}
        '></div>`
        favorito.appendChild(divCard)
    }


}
document.addEventListener("DOMContentLoaded", () =>{
favoritesList()

})

function eliminar(){
    localStorage.removeItem("favorites")
    const favorito = document.getElementById("favoritos")
    favorito.innerHTML = "";
}

