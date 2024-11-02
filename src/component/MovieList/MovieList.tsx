import MovieItem from "../MovieItem/MovieItem.tsx";
import "./MovieList.css";
import { useState, useEffect, useRef } from "react";
import convertApiResponseToMovieList from "../../domain/convertApimoviesToMovies";
import {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchTotalPage,
} from "../../domain/movieAPI";
import { Movie } from "../../util/type";
import SkeletonMovieItems from "../MovieItem/SkeletonMovieItem";

interface Props {
  searchText: string;
  isEnter: boolean;
}

const MovieList: React.FC<Props> = ({ searchText, isEnter }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState<Movie[] | null>([]);
  const observerRef = useRef(null);
  const lastPage = useRef(1);
  const [submitText, setSubmitText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showingItemCount = 19;

  const applyPopularMovieList = async (page: number) => {
    setIsLoading(true);
    const data = await fetchPopularMovies(page);
    if (data === null) {
      setMovie(null);
      return;
    }
    await setMovie((prevMovies) => {
      if (prevMovies === null) prevMovies = [];
      return [...prevMovies, ...convertApiResponseToMovieList(data)];
    });
    setIsLoading(false);
  };

  const applySearchMovieList = async (page: number, submitText: string) => {
    setIsLoading(true);
    const data = await fetchSearchMovies(page, submitText);
    if (data === null) {
      setMovie(null);
      return;
    }
    setMovie((prevMovies) => {
      if (prevMovies === null) prevMovies = [];
      return prevMovies.length === 0
        ? [...convertApiResponseToMovieList(data)]
        : [...prevMovies, ...convertApiResponseToMovieList(data)];
    });
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
    if (submitText === "") applyPopularMovieList(page);
    else applySearchMovieList(page, submitText);

    fetchTotalPage(submitText).then((result) => {
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

  if (movies === null)
    return <p style={{ fontSize: "100px" }}>네트워크 오류가 발생했습니다..</p>;
  else
    return (
      <div className="MovieListWrapper">
        <div className="MovieListTitle">
          {submitText === ""
            ? "지금 인기있는 영화"
            : `"${submitText}"의 검색 결과`}
        </div>
        <div className="MovieList">
          {isLoading && <SkeletonMovieItems />}
          {movies.length === 0 ? (
            <div className="NoResult">검색 결과가 없어요.</div>
          ) : (
            movies.map((_, index) => (
              <MovieItem key={index} movie={movies[index]} />
            ))
          )}
          {movies.length > showingItemCount && (
            <div ref={observerRef} style={{ height: "1px" }} />
          )}
          {isLoading && lastPage.current >= page && <SkeletonMovieItems />}
        </div>
      </div>
    );
};

export default MovieList;
