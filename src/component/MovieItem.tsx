import "./MovieItem.css";
import { Movie } from "../util/type";
import SkeletonMovieItem from "./SkeletonMovieItem";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  if (movie === undefined) return <SkeletonMovieItem />;
  return (
    <>
      <div className="MovieItem" onClick={() => console.log(movie.genres)}>
        <img
          className="movieImage"
          src={`https://image.tmdb.org/t/p/w200/${movie.poster}`}
        />
        <div className="movieTitle">{movie.title}</div>
        <div className="movieGernes">
          🎖️{Math.ceil(movie.ratings * 10) / 10}
        </div>
      </div>
    </>
  );
};

export default MovieItem;
