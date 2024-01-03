import { MovieModel } from "../App";

type NumResultsProps = {
  movies: MovieModel[];
};

export default function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
