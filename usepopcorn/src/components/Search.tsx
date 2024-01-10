interface ISearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function Search({ query, setQuery }: ISearchProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
