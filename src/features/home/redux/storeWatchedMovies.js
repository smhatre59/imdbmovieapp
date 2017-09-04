import {
  HOME_STORE_WATCHED_MOVIES,
} from './constants';

export function storeWatchedMovies(movieTitle) {
  return {
    type: HOME_STORE_WATCHED_MOVIES,
    movieTitle
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_STORE_WATCHED_MOVIES:
      let watchedMovieList = state.watchedMovieList;
      let movieAlreadyExists = false;
      if(watchedMovieList.length>0){
        console.log("movies need to be added");
        for(var i in watchedMovieList){
          if(watchedMovieList[i].Title === action.movieTitle)
          {
            movieAlreadyExists = true;
            break;
          }
        }

        if(!movieAlreadyExists){
          watchedMovieList.push(state.movieListData);
        }
      }
      else{
        watchedMovieList.push(state.movieListData);
      }
      return {
        ...state,
        watchedMovieList: watchedMovieList
      };

    default:
      return state;
  }
}
