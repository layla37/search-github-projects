import { call, put, takeLatest } from 'redux-saga/effects';

const ENDPOINT = 'https://api.github.com/search/repositories';

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

  return projectsArray;
};

function* fetchProjects({ payload }) {
  try {
    const url = `${ENDPOINT}${payload.queryString}`;
    let repos = yield call(fetch, url);
    repos = yield repos.json();
    const formattedResults = formatAndSetResults(repos);
    yield put({type: 'UPDATE_RESULTS', payload: formattedResults});
    yield put({type: 'IS_NOT_LOADING', payload: false});
 } catch (error) {
    console.error('error when fetching projects: ', error);
 }
};

function* reposSaga() {
  yield takeLatest("PROJECT_FETCH_REQUESTED", fetchProjects);
}

export default reposSaga;
