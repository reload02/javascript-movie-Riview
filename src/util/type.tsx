export type Movie = {
  id: string;
  genres: string;
  overview: string;
  poster: string;
  title: string;
  ratings: number;
};

export type ApiMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ApiMovies = {
  page: number;
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
};
