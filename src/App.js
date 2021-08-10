import { render } from 'react-dom';
import SearchRepos from './SearchRepos';

const App = () => {
  return (
    <SearchRepos />
  );
};

render(<App />, document.getElementById('root'));