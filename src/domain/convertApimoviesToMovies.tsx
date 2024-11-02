import genresById from "./genresById.tsx";
import { Movie, ApiMovie, ApiMovies } from "../util/type.tsx";

const convertApiResponseToMovieList = (MovieDatas: ApiMovies): Movie[] => {
  return MovieDatas.results.map((movie: ApiMovie) => {
    return {
      id: movie.id.toString(),
      genres: genresById(movie.genre_ids).join(","),
      overview: movie.overview,
      poster: movie.poster_path,
      title: movie.title,
      ratings: Math.ceil(movie.vote_average * 10) / 10,
    };
  });
};

export default convertApiResponseToMovieList;
