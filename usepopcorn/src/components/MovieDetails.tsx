import { useEffect, useState } from "react";
import { KEY } from "../App";
import StarRating from "./StarRating";
import Loader from "./Loader";

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
  selectedId: string;
  onCloseMovie: () => void;
}

export default function MovieDetails({
  selectedId,
  onCloseMovie,
}: IMovieDetailsProps) {
  const [movie, setMovie] = useState(new DetailsModel());
  const [isLoading, setIsLoading] = useState(false);

  console.log(movie.Title, movie.Year);

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
              <StarRating maxRating={10} size={24} />
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
