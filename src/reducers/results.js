export default function results(state = [], action) {
  switch (action.type) {
    case "CHANGE_RESULTS":
      return action.payload;
    default:
      return state;
  }
}