import React, { useState } from "react";
import Movie from "./component/MovieItem.tsx";
import Store from "./domain/Store.tsx";
import Header from "./component/Header.tsx";
import "./App.css";
import MovieList from "./component/MovieList.tsx";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="movieListWrapper">
        <MovieList />
      </div>
    </div>
  );
};

export default App;
