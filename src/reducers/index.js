import { combineReducers } from "redux";
import projectName from "./projectName";
import programmingLanguage from "./programmingLanguage";
import results from "./results";

export default combineReducers({
  projectName,
  programmingLanguage,
  results
});