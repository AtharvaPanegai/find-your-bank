export default function searchParams(
  state = { city: "PUNE", category: "", query: "" },
  action
) {
  switch (action.type) {
    case "SET_SEARCH_PARAMS":
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
