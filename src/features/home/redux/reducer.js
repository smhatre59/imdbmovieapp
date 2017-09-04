import initialState from './initialState';
import { reducer as fetchRedditReactjsList } from './fetchRedditReactjsList';
import { reducer as storeWatchedMoviesReducer } from './storeWatchedMovies';

const reducers = [
  fetchRedditReactjsList,
  storeWatchedMoviesReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Put global reducers here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
