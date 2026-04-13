//variable global
var pokemonActual = null;

// Buscar Pokémon
function searchPokemon(){
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