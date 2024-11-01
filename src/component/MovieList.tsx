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
import SkeletonMovieItems from "./SkeletonMovieItem";

interface MovieListProps {
  searchText: string;
  isEnter: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ searchText, isEnter }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState<Movie[]>([]);
  const observerRef = useRef(null);
  const lastPage = useRef(1);
  const [submitText, setSubmitText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const applyPopularMovieList = async (page: number) => {
    setIsLoading(true);
    const data = await fetchPopularMovies(page);
    await setMovie((prevMovies) => [
      ...prevMovies,
      ...convertApiResponseToMovieList(data),
    ]);
    setIsLoading(false);
  };

  const applySearchMovieList = async (page: number, submitText: string) => {
    setIsLoading(true);
    const data = await fetchSearchMovies(page, submitText);
    await setMovie((prevMovies) =>
      prevMovies.length === 0
        ? [...convertApiResponseToMovieList(data)]
        : [...prevMovies, ...convertApiResponseToMovieList(data)]
    );
    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [movies]);

  useEffect(() => {
    if (page === 0) return;
    submitText === ""
      ? applyPopularMovieList(page)
      : applySearchMovieList(page, submitText);
    fetchTotalPage((result) => {
      lastPage.current = Number(result);
    });
  }, [page, submitText]);

  useEffect(() => {
    if (isEnter) {
      setSubmitText(searchText);
      setPage(0);
      setTimeout(() => {
        setPage(1);
        setMovie([]);
      }, 0);
    }
  }, [isEnter]);

  return (
    <div className="MovieList">
      {isLoading && SkeletonMovieItems()}
      {movies.length === 0 ? (
        <div className="NoResult">"{submitText}"의 검색 결과가 없어요.</div>
      ) : (
        movies.map((_, index) => (
          <MovieItem key={index} movie={movies[index]} />
        ))
      )}
      {movies.length > 19 && (
        <div ref={observerRef} style={{ height: "1px" }} />
      )}
      {isLoading && lastPage.current >= page && SkeletonMovieItems()}
    </div>
  );
};

export default MovieList;
