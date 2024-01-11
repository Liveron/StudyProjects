import { useEffect, useState } from "react";
import { MovieModel } from "../App";

export const KEY = "8549e926";

export function useMovies(
  query: string,
  callback?: () => void
): [MovieModel[], boolean, string] {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller?.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

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

    // handleCloseMovie();
    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return [movies, isLoading, error];
}
