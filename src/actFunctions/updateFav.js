export function addFav(favorites, add) {
  const updatedFavorites = Object.assign([], favorites);
  updatedFavorites.push(add);
  const myStorage = window.localStorage;
  myStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  return { type: "SET_FAVORITES", payload: updatedFavorites };
}
export function removeFav(favorites, remove) {
  const updatedFavorites = Object.assign(
    [],
    favorites.filter((fav) => {
      return fav.ifsc !== remove.ifsc;
    })
  );
  const myStorage = window.localStorage;
  myStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  return { type: "SET_FAVORITES", payload: updatedFavorites };
}

export default function updateFav(fav) {
  return { type: "SET_FAVORITES", payload: fav };
}
