export default function favorites(state = [], action) {
  switch (action.type) {
    case "SET_FAVORITES": {
      return Object.assign([], action.payload);
    }
    default:
      return state;
  }
}
