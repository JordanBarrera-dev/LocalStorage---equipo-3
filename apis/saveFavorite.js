function saveFavorite(pokemonInfo) {
    let list_favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let favoritesSet = new Set(list_favorites);
    favoritesSet.add(pokemonInfo);
    localStorage.setItem("favorites", JSON.stringify([...favoritesSet]));
}