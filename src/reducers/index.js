import { combineReducers } from "redux";
import allBanks from "./allBanks";
import searchParams from "./searchParams";
import favorites from "./favorites";
import loading from "./loading";
import error from "./error";

export default combineReducers({
  allBanks,
  searchParams,
  favorites,
  loading,
  error,
});

// the structure of redux store is defined in this file
