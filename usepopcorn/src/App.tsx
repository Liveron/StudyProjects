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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

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
  const [selectedId, setSelectedId] = useState("");
  const [movies, isLoading, error] = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState<WatchedMovieModel[]>(
    [],
    "watched"
  );

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? "" : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  function handleAddWatched(movie: WatchedMovieModel) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
