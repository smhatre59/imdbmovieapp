import { expect } from 'chai';

import {
  HOME_STORE_WATCHED_MOVIES,
} from 'src/features/home/redux/constants';

import {
  storeWatchedMovies,
  reducer,
} from 'src/features/home/redux/storeWatchedMovies';

describe('home/redux/storeWatchedMovies', () => {
  it('returns correct action by storeWatchedMovies', () => {
    expect(storeWatchedMovies()).to.have.property('type', HOME_STORE_WATCHED_MOVIES);
  });

  it('handles action type HOME_STORE_WATCHED_MOVIES correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_STORE_WATCHED_MOVIES }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
