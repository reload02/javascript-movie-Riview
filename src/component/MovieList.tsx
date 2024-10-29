import MovieItem from "./MovieItem";
import "./MovieList.css";
import { useState, useEffect, useRef } from "react";
import Store from "../domain/convertApimoviesToMovies";
import { fetchPopularMovies } from "../domain/movieAPI";
import { Movie } from "../util/type";

interface MovieListProps {
  searchText: string;
  isEnter: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ searchText, isEnter }) => {
  const [itemCount, setItemCount] = useState(20);
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState<Movie[]>([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPopularMovies(page, searchText);
      setMovie((prevMovies) => [...prevMovies, ...Store(data)]);
    };
    fetchData();
  }, [page, searchText, isEnter]);

  useEffect(() => {
    setMovie([]);
    setPage(1);
  }, [isEnter]);

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
    <div
      className="MovieList"
      onClick={() => {
        console.log(itemCount);
      }}
    >
      {Array.from({ length: itemCount }).map((_, index) =>
        itemCount > 0 ? (
          <MovieItem key={index} idx={index} movies={movies} />
        ) : (
          <div>ㅋㅋ</div>
        )
      )}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default MovieList;
