import React from "react";
import "./MovieDetailModal.css";
import { Movie } from "../../util/type";
import StarRating from "./starRating";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  movie: Movie;
}

const Modal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, movie }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal" onClick={() => setIsModalOpen(false)}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <p className="modalTitle">{movie.title}</p>
        <section className="modalDetail">
          <section className="leftSection">
            <img
              className="moviePoster"
              src={`https://image.tmdb.org/t/p/w200/${movie.poster}`}
            />
          </section>
          <section className="rightSection">
            <p className="movieGenre">장르 : {movie.genres}</p>
            <p className="movieOverview">{movie.overview}</p>
            <p className="movieRating">
              평점 : 🎖️{Math.ceil(movie.ratings * 10) / 10}
            </p>
            <span>별점매기기 : </span>
            <StarRating movieId={movie.id} />
          </section>
        </section>
      </div>
    </div>
  );
};

export default Modal;
