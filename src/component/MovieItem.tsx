import "./MovieItem.css";
import { Movie } from "../util/type";
import Modal from "./Modal";
import { useState } from "react";
interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="MovieItem"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w200/${movie.poster}`}
        />
        <div className="movieTitle">{movie.title}</div>
        <div className="movieGernes">
          🎖️{Math.ceil(movie.ratings * 10) / 10}
        </div>
      </div>{" "}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        movie={movie}
      />
    </>
  );
};

export default MovieItem;
