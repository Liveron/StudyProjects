import { MovieModel } from "../App";
import Movie from "./MovieProps";

type MovieListProps = {
  movies: MovieModel[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
