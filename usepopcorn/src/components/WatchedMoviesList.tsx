import { WatchedMovieModel } from "../App";
import WatchedMovie from "./WatchedMovie";

type WatchedMoviesListProps = {
  watched: WatchedMovieModel[];
};
export default function WatchedMoviesList({ watched }: WatchedMoviesListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
