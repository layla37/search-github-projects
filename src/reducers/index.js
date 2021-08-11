import { combineReducers } from "redux";
import isLoading from './isLoading';
import projectName from "./projectName";
import programmingLanguage from "./programmingLanguage";
import results from "./results";

export default combineReducers({
  isLoading,
  projectName,
  programmingLanguage,
  results
});