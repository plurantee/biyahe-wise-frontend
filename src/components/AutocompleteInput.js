import React, { useState, useEffect, useRef } from 'react';

const AutocompleteInput = ({ onSelect, placeholder, defaultValue }) => {
  const [query, setQuery] = useState(defaultValue || "");
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const debounceRef = useRef();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ", Metro Manila, Philippines")}&format=json&addressdetails=1&limit=5`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
      setHighlightedIndex(0);
    }, 300);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex(prev => Math.min(prev + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter") {
      if (results[highlightedIndex]) {
        onSelect(results[highlightedIndex]);
        setQuery(results[highlightedIndex].display_name);
        setResults([]);
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-4 border border-gray-300 rounded-full"
      />
      {results.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full z-10 mt-1 max-h-48 overflow-y-auto">
          {results.map((result, index) => (
            <li
              key={result.place_id}
              className={`p-2 cursor-pointer ${highlightedIndex === index ? 'bg-blue-200' : ''}`}
              onClick={() => {
                onSelect(result);
                setQuery(result.display_name);
                setResults([]);
              }}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;