import { useRef } from "react";
import { useKey } from "../hooks/useKey";

interface ISearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function Search({ query, setQuery }: ISearchProps) {
  const inputEL = useRef<HTMLInputElement>(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEL.current) return;
    inputEL.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEL}
    />
  );
}
