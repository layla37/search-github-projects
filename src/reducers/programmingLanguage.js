export default function programmingLanguage(state = '', action) {
  switch (action.type) {
    case "CHANGE_PROGRAMMING_LANGUAGE":
      return action.payload;
    default:
      return state;
  }
}