import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_MOVIES,
} from '../utils/actions';
import { QUERY_MOVIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentMovie, setCurrentMovie] = useState({});

  const { loading, data } = useQuery(QUERY_MOVIES);

  const { movies, cart } = state;

  useEffect(() => {
    // already in global store
    if (movies.length) {
      setCurrentMovie(movies.find((movie) => movie._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_MOVIES,
        movies: data.movies,
      });

      data.movies.forEach((movie) => {
        idbPromise('movies', 'put', movie);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('movies', 'get').then((indexedMovies) => {
        dispatch({
          type: UPDATE_MOVIES,
          movies: indexedMovies,
        });
      });
    }
  }, [movies, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        movie: { ...currentMovie, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentMovie, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentMovie._id,
    });

    idbPromise('cart', 'delete', { ...currentMovie });
  };

  return (
    <>
      {currentMovie && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Movies</Link>

          <h2>{currentMovie.name}</h2>

          <p>{currentMovie.description}</p>

          <p>
            <strong>Price:</strong>${currentMovie.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentMovie._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentMovie.image}`}
            alt={currentMovie.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
