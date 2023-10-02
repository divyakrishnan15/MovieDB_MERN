import React from "react";
import MovieList from "../components/MovieList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <MovieList />
      <Cart />
    </div>
  );
};

export default Home;
