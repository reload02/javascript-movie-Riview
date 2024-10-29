import MovieItem from "./MovieItem";
import "./MovieList.css";
import { useState, useEffect } from "react";
import Store from "../domain/convertApimoviesToMovies";
import { fetchPopularMovies } from "../domain/movieAPI";
import { Movie } from "../util/type";

const MovieList: React.FC = () => {
  const [itemCount, setItemCount] = useState(20);
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPopularMovies(page);
      setMovie((prevMovies) => [...prevMovies, ...Store(data)]);
    };
    fetchData();
  }, [page]);

  return (
    <>
      <div className="MovieList">
        {Array.from({ length: itemCount }).map((_, index) => (
          <MovieItem key={index} idx={index} movies={movies} />
        ))}
      </div>
      <button
        onClick={() => {
          setItemCount(itemCount + 20);
          setPage(page + 1);
        }}
      >
        더보기
      </button>
    </>
  );
};

export default MovieList;
