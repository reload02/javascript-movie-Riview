import MovieItem from "./MovieItem";
import "./MovieList.css";
import { useState, useEffect, useRef } from "react";
import Store from "../domain/convertApimoviesToMovies";
import { fetchPopularMovies } from "../domain/movieAPI";
import { Movie } from "../util/type";

const MovieList: React.FC = () => {
  const [itemCount, setItemCount] = useState(20);
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState<Movie[]>([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPopularMovies(page);
      setMovie((prevMovies) => [...prevMovies, ...Store(data)]);
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItemCount((prevCount) => prevCount + 20);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  return (
    <div className="MovieList">
      {Array.from({ length: itemCount }).map((_, index) => (
        <MovieItem key={index} idx={index} movies={movies} />
      ))}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default MovieList;
