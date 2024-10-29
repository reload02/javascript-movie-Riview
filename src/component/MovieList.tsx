import MovieItem from "./MovieItem";
import "./MovieList.css";
import { useState, useEffect } from "react";
import Store from "../domain/Store";
import { fetchPopularMovies } from "../domain/movieAPI";
import { Movie } from "../util/type";

const MovieList: React.FC = () => {
  // 처음에느 일단 리스트가 스켈레톤 20개 생성 각 아이템들은 api호출이 끝나면 표시하기 만약 값이 없으면 자시 자신 삭제
  const [itemCount, setItemCount] = useState(20);
  const [page, setPage] = useState(1);
  const [movies, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    console.log("호출");
    // 비동기 데이터를 가져오는 함수
    const fetchData = async () => {
      console.log("page :" + page);
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
