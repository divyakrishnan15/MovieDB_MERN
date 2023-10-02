import React, { useEffect } from 'react';
import MovieItem from '../MovieItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MOVIES, UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_MOVIES, QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function MovieList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_MOVIES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_MOVIES,
        movies: data.movies,
      });
      data.movies.forEach((movie) => {
        idbPromise('movies', 'put', movie);
      });
    } else if (!loading) {
      idbPromise('movies', 'get').then((movies) => {
        dispatch({
          type: UPDATE_MOVIES,
          movies: movies,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterMovies() {
    if (!currentCategory) {
      return state.movies;
    }

    return state.movies.filter(
      (movie) => movie.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Movies:</h2>
      {state.movies.length ? (
        <div className="flex-row">
          {filterMovies().map((movie) => (
            <MovieItem
              key={movie._id}
              _id={movie._id}
              image={movie.image}
              name={movie.name}
              price={movie.price}
              quantity={movie.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any movies yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default MovieList;
