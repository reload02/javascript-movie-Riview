import "./MovieItem.css";
import { Movie } from "../util/type";

interface MovieItemProps {
  idx: number;
  movies: Movie[];
}

const MovieItem: React.FC<MovieItemProps> = ({ idx, movies }) => {
  if (!movies[idx])
    return (
      <>
        <div className="MovieItem">
          <div className="skeletonMovieImage" />
          <div className="movieTitle"></div>
          <div className="movieGernes">🎖️</div>
        </div>
      </>
    );
  else
    return (
      <>
        <div>
          <img
            className="movieImage"
            src={`https://image.tmdb.org/t/p/w200/${movies[idx].poster}`}
          />
          <div className="movieTitle">{movies[idx].title}</div>
          <div className="movieGernes">
            🎖️{Math.ceil(movies[idx].ratings * 10) / 10}
          </div>
        </div>
      </>
    );
};

export default MovieItem;
