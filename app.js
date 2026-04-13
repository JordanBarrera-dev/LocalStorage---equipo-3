var pokemonActual = null;

function searchPokemon(){
    var nombre = document.getElementById("pokemonInput").value.toLowerCase(); 
    var url = "https://pokeapi.co/api/v2/pokemon/" + nombre;

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

            let list_favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const btn = document.getElementById("favorite-ones");
            const exists = list_favorites.some(p => p.nombre === pokemonActual.nombre);

            if (exists) {
                btn.disabled = true;
                btn.textContent = "Ya en favoritos";
            } else {
                btn.disabled = false;
                btn.textContent = "Guardar favorito";
            }
        })
        .catch(function () {
            alert("Pokémon no encontrado");
        });
}

function mostrarPokemon() {
    var resultado = document.getElementById("resultado");
    var tipos = "";
    pokemonActual.tipos.forEach(function(t) {
        tipos += "<p>Tipo: " + t.type.name + "</p>";
    });

    var habilidades = "";
    pokemonActual.habilidades.forEach(function(h) {
        habilidades += "<p>Habilidad: " + h.ability.name + "</p>";
    });

    var stats = "";
    pokemonActual.stats.forEach(function(s) {
        stats += "<p>" + s.stat.name + ": " + s.base_stat + "</p>";
    });

    resultado.innerHTML =
        "<div class='card'>" +
        "<h3>" + pokemonActual.nombre + "</h3>" +
        "<img src='" + pokemonActual.imagen + "'>" +
        tipos +
        "<p>Altura: " + pokemonActual.altura + "</p>" +
        "<p>Peso: " + pokemonActual.peso + "</p>" +
        habilidades +
        "<h4>Stats:</h4>" +
        "<div class='stats'>" +
        stats +
        "</div>" +
        "</div>";
}

function saveFavorite(pokemonInfo) {
    let list_favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = list_favorites.some(p => p.nombre === pokemonInfo.nombre);

    if (!exists) {
        list_favorites.push(pokemonInfo);
        localStorage.setItem("favorites", JSON.stringify(list_favorites));
        favoritesList();
    }
}

document.getElementById("favorite-ones").addEventListener("click", () => {
    if (pokemonActual) {
        saveFavorite(pokemonActual);
        document.getElementById("favorite-ones").disabled = true;
        document.getElementById("favorite-ones").textContent = "Ya en favoritos";
    }
});

function favoritesList(){
    let list_favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favorito = document.getElementById("favoritos");

    favorito.innerHTML = "";

    list_favorites.forEach(pokemon => {
        const divCard = document.createElement("div");
        divCard.className = "tarjetas";

        divCard.innerHTML = `
            <div class='card'>
                <h3>${pokemon.nombre}</h3>
                <img src='${pokemon.imagen}'>
            </div>
        `;

        favorito.appendChild(divCard);
    });
}

document.addEventListener("DOMContentLoaded", () =>{
    favoritesList();
});

function eliminar(){
    localStorage.removeItem("favorites");
    const favorito = document.getElementById("favoritos");
    favorito.innerHTML = "";
}