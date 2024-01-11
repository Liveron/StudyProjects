import { WatchedMovieModel } from "../App";
import WatchedMovie from "./WatchedMovie";

type WatchedMoviesListProps = {
  watched: WatchedMovieModel[];
  onDeleteWatched: (id: string) => void;
};
export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
}: WatchedMoviesListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
