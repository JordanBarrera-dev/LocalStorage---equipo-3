function saveFavorite(pokemonInfo) {
    let list_favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    list_favorites.push(pokemonInfo);
    localStorage.setItem("favorites", JSON.stringify(list_favorites));
    //const favoritesDiv = document.querySelector(".list-favorites");
}