import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

export class MovieModel {
  imdbID: string = "";
  Title: string = "";
  Year: string = "";
  Poster: string = "";
}

export class WatchedMovieModel {
  imdbID: string = "";
  Title: string = "";
  Year: string = "";
  Poster: string = "";
  runtime: number = 0;
  imdbRating: number = 0;
  userRating: number = 0;
}

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

export const KEY = "8549e926";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [watched, setWatched] = useState<WatchedMovieModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? "" : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  function handleAddWatched(movie: WatchedMovieModel) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  async function fetchMovies(controller?: AbortController) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        { signal: controller?.signal }
      );
      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);

        if (err.name !== "AbortError") setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }

    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    handleCloseMovie();
    fetchMovies(controller);

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />{" "}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
