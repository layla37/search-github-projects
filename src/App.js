import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import SearchRepos from './SearchRepos';

const App = () => {
  return (
    <SearchRepos />
  );
};

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));