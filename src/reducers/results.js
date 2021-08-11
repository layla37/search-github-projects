export default function results(state = [], action) {
  switch (action.type) {
    case "UPDATE_RESULTS":
      return action.payload;
    default:
      return state;
  }
}