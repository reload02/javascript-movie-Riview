import MovieItem from "./MovieItem";
import "./MovieList.css";
import { useState, useEffect, useRef } from "react";
import convertApiResponseToMovieList from "../domain/convertApimoviesToMovies";
import {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchTotalPage,
} from "../domain/movieAPI";
import { Movie } from "../util/type";

interface MovieListProps {
  searchText: string;
  isEnter: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ searchText, isEnter }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState<Movie[]>([]);
  const [itemCount, setItemCount] = useState(20);
  const observerRef = useRef(null);
  const total_page = useRef(100);
  const fetchData = async (page: number, searchText: string) => {
    const data =
      searchText === ""
        ? await fetchPopularMovies(page)
        : await fetchSearchMovies(page, searchText);

    setMovie((prevMovies) => [
      ...prevMovies,
      ...convertApiResponseToMovieList(data),
    ]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
          setItemCount((prev) => prev + 20); // 최대  페이지면 다르게
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  useEffect(() => {
    setItemCount(movies.length);
  }, [movies]);

  useEffect(() => {
    fetchData(page, searchText);
  }, [page]);

  useEffect(() => {
    if (isEnter) {
      setMovie([]);
      setPage(1);
    }
  }, [isEnter]);

  if (searchText !== "")
    fetchTotalPage(searchText).then((result) => {
      total_page.current = result;
    });

  return (
    <div className="MovieList">
      {Array.from({ length: itemCount }).map((_, index) => (
        <MovieItem key={index} movie={movies[index]} />
      ))}
      {total_page.current !== page && (
        <div ref={observerRef} style={{ height: "1px" }} />
      )}
    </div>
  );
};

export default MovieList;
