export default function projectName(state = '', action) {
  switch (action.type) {
    case "CHANGE_PROJECT_NAME":
      return action.payload;
    default:
      return state;
  }
}