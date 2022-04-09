import axios from "axios";
import updateBanks from "./actFunctions/updateBanks";
import updateLoading from "./actFunctions/updateLoading";
import updateError from "./actFunctions/updateError";
import store from "./store";

const myStorage = window.localStorage;
// initialize cache OR clear cache from previous session
myStorage.setItem("cache", JSON.stringify({}));

// clear cache if time has expired > 1 min
function clearFromCache(key) {
  const cached = JSON.parse(myStorage.getItem("cache"));
  if (cached[key]["exp"] < Date.now()) {
    delete cached[key];
  }
  myStorage.setItem("cache", JSON.stringify(cached));
}

// return required key from cache
function getFromCache(key) {
  const cached = JSON.parse(myStorage.getItem("cache"));
  return cached[key];
}

// set cache with expiry of 1 min and initalize timeout for its auto-deletion
function setCache(key, data) {
  const cached = JSON.parse(myStorage.getItem("cache"));
  cached[key] = { exp: Date.now() + 60000, data };
  myStorage.setItem("cache", JSON.stringify(cached));

  setTimeout(() => {
    clearFromCache(key, data);
  }, 60000);
}

// method which uses API/cache
function getBanksFromAPI() {
  store.dispatch(updateBanks([]));

  store.dispatch(updateLoading(true));
  const storeData = store.getState();

  if (!getFromCache(storeData.searchParams.city)) {
    axios
      .get(
       `https://vast-shore-74260.herokuapp.com/banks?city=${storeData.searchParams.city}`,
        { timeout: 15000 }
      )
      .then((res) => {
        // update store and cache
        store.dispatch(updateBanks(res.data));
        store.dispatch(updateLoading(false));
        setCache(storeData.searchParams.city, res.data);
      })
      .catch((data) => {
        const error = {
          msg: data.message,
          body: data,
        };
        store.dispatch(updateError(error));
        store.dispatch(updateLoading(false));
      });
  } else {
    // update store and increase expiry of cached data
    const cachedData = getFromCache(storeData.searchParams.city);
    store.dispatch(updateBanks(cachedData.data));
    store.dispatch(updateLoading(false));
    setCache(storeData.searchParams.city, cachedData.data);
  }
}

export default getBanksFromAPI;
