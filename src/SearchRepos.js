import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import changeProjectName from './actionCreators/changeProjectName';
import changeProgrammingLanguage from './actionCreators/changeProgrammingLanguage';
import updateResults from './actionCreators/updateResults';

const PROGRAMMING_LANGUAGES = ['C', 'C++', 'C#', 'Go', 'Java', 'JavaScript', 'PHP', 'Python', 'Ruby', 'Scala', 'TypeScript'];

const SearchRepos = () => {
  const [validationErrorMessage, setValidationErrorMessage] = useState('');
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const projectName = useSelector((state) => state.projectName);
  const programmingLanguage = useSelector((state) => state.programmingLanguage);
  const results = useSelector((state) => state.results);

  const handleSearch = (e) => {
    e.preventDefault();

    if (validationErrorMessage) {
      setValidationErrorMessage('');
    }

    if (results) {
      dispatch(updateResults([]));
    }

    if (!projectName || !programmingLanguage) {
      return setValidationErrorMessage('You must choose a project name AND a programming language');
    }

    dispatch({ type: "IS_LOADING", payload: true });
    
    const searchTerm = encodeURIComponent(projectName);
    const queryString = `?q=${searchTerm}+language:${programmingLanguage}&sort=stars&order=desc`;

    dispatch({type: 'PROJECT_FETCH_REQUESTED', payload: {queryString}})
  };

  const handleClear = () => {
    dispatch(updateResults([]));
    dispatch(changeProgrammingLanguage(''));
    dispatch(changeProjectName(''));
  };

  return (
    <div className='container'>
      <div className='search-box'>
        <div>
          <h2>Search for projects on GitHub</h2>
          {validationErrorMessage && <div className='error-message'>{validationErrorMessage}</div>}
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