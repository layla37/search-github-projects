import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import changeProjectName from './actionCreators/changeProjectName';
import changeProgrammingLanguage from './actionCreators/changeProgrammingLanguage';
import changeResults from './actionCreators/changeResults';

const ENDPOINT = 'https://api.github.com/search/repositories';
const PROGRAMMING_LANGUAGES = ['C', 'C++', 'C#', 'Go', 'Java', 'JavaScript', 'PHP', 'Python', 'Ruby', 'Scala', 'TypeScript'];

const SearchRepos = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const projectName = useSelector((state) => state.projectName);
  const programmingLanguage = useSelector((state) => state.programmingLanguage);
  const results = useSelector((state) => state.results);
  

  const formatAndSetResults = (data) => {
    const { items } = data;

    if (!items) return;

    const projectsArray = items.map(item => {
      let description = item.description;
      if (description && description.length > 150) {
        description = `${description.slice(0, 150)}...`;
      }
      return {
        name: item.full_name,
        description: description,
        id: item.id,
        url: item.html_url
      };
    });

    dispatch(changeResults(projectsArray));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (errorMessage) {
      setErrorMessage('');
    }

    if (results) {
      dispatch(changeResults([]));
    }

    if (!projectName || !programmingLanguage) {
      return setErrorMessage('You must choose a project name AND a programming language');
    }

    setIsLoading(true);

    try {
      const searchTerm = encodeURIComponent(projectName);
      const queryString = `?q=${searchTerm}+language:${programmingLanguage}&sort=stars&order=desc`;
      const response = await fetch(`${ENDPOINT}${queryString}`);
      const data = await response.json();
      formatAndSetResults(data);
      setIsLoading(false);
    } catch(error) {
      console.error('error when searching GitHUb for projects: ', error);
    }
    
  };

  const handleClear = () => {
    dispatch(changeResults([]));
    dispatch(changeProgrammingLanguage(''));
    dispatch(changeProjectName(''));

  };

  return (
    <div className='container'>
      <div className='search-box'>
        <div>
          <h2>Search for projects on GitHub</h2>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
          <label>
            Project name:
            <input type='text' value={projectName} onChange={(e) => dispatch(changeProjectName(e.target.value))} />
          </label>
        </div>
        <div>
          <label>
            Choose programming language:
            <select 
              value={programmingLanguage} 
              onChange={(e) => dispatch(changeProgrammingLanguage(e.target.value))}
              onBlur={(e) => dispatch(changeProgrammingLanguage(e.target.value))}
            >
              <option />
              {
                PROGRAMMING_LANGUAGES.map(language => {
                  return <option value={language} key={language}>{language}</option>
                })
              }
            </select>
          </label>
        </div>
      </div>
      <div className='buttons'>
        <button onClick={handleSearch}>search</button>
        {results && results.length > 0 && <button onClick={handleClear}>clear</button>}
      </div>
      <div className='results'>
        {isLoading && <div className='loading'>Finding projects...</div>}
        {results && results.length > 0 && (
            <ul>
              {results.map(project => {
                return (
                  <li key={project.id}>
                    <div><a href={project.url}>{project.name}</a></div>
                    <div>{project.description}</div>
                  </li>
                )
              })}
            </ul>
        )}
      </div>
      
    </div>
  );
}

export default SearchRepos;