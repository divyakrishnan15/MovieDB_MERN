import { gql } from '@apollo/client';

export const QUERY_MOVIES = gql`
  query getMovies($category: ID) {
    movies(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($movies: [ProductInput]) {
    checkout(movies: $movies) {
      session
    }
  }
`;

export const QUERY_ALL_MOVIES = gql`
  {
    movies {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        movies {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
