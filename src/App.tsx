import React, { useState } from "react";
import Header from "./component/Header.tsx";
import "./App.css";
import MovieList from "./component/MovieList.tsx";

const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isEnter, SetIsEnter] = useState(false);
  return (
    <div className="App">
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        SetIsEnter={SetIsEnter}
      />
      <div className="movieListWrapper">
        <MovieList searchText={searchText} isEnter={isEnter} />
      </div>
    </div>
  );
};

export default App;
