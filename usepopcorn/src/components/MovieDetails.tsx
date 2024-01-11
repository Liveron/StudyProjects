import { useEffect, useState } from "react";
import { KEY, WatchedMovieModel } from "../App";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { title } from "process";

class DetailsModel {
  Title: string = "";
  Year: string = "";
  Poster: string = "";
  Runtime: string = "";
  imdbRating: string = "";
  Plot: string = "";
  Released: string = "";
  Actors: string = "";
  Director: string = "";
  Genre: string = "";
}

interface IMovieDetailsProps {
  watched: WatchedMovieModel[];
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovieModel) => void;
}

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: IMovieDetailsProps) {
  const defaultRating =
    watched.find((movie) => movie.imdbID === selectedId)?.userRating || 0;

  const [movie, setMovie] = useState(new DetailsModel());
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(defaultRating);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  function handleAdd() {
    const newWatchedMovie: WatchedMovieModel = {
      ...movie,
      imdbID: selectedId,
      runtime: Number(movie.Runtime.split(" ").at(0)),
      imdbRating: Number(movie.imdbRating),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  async function getMovieDetails() {
    setIsLoading(true);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
    );
    const data = await res.json();
    setMovie(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    document.title = `Movie | ${movie.Title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [movie.Title]);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === "Escape") onCloseMovie();
    };
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
                defaultRating={userRating}
              />
              {userRating > 0 && !isWatched && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
