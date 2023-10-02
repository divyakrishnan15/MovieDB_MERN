const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Movie {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    movies: [Movie]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input MovieInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    movies(category: ID, name: String): [Movie]
    movie(_id: ID!): Movie
    user: User
    order(_id: ID!): Order
    checkout(movies: [MovieInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(movies: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateMovie(_id: ID!, quantity: Int!): Movie
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
