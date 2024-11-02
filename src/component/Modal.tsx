import React, { useEffect, useState } from "react";
import "./Modal.css";
import { Movie } from "../util/type";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  movie: Movie;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  movie,
}) => {
  const [pickedStar, setPIckedStar] = useState(5);
  const [starList] = useState([true, true, true, true, true]);

  useEffect(() => {
    if (localStorage.getItem(movie.title) === null) setPIckedStar(5);
    else setPIckedStar(Number(localStorage.getItem(movie.title)));
  }, []);

  useEffect(() => {
    pickedStar !== 5 &&
      localStorage.setItem(movie.title, pickedStar.toString());
  }, [pickedStar]);
  if (!isModalOpen) return null;

  return (
    <div className="modal" onClick={() => setIsModalOpen(false)}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <p className="modalTitle">{movie.title}</p>{" "}
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
            {starList.map((_, index) => (
              <span
                key={index}
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => {
                  setPIckedStar(index);
                }}
              >
                {pickedStar >= index ? "★" : "☆"}
              </span>
            ))}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Modal;
