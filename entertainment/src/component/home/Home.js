import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import Trending from "../trending/Trending";
import SearchResults from "../searchresult/SearchResult";
import Recommendation from "../recommendation/Recommendation";
import "./home.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const apiKey = process.env.REACT_APP_MYAPI;
  const timerRef = useRef(null);

  useEffect(() => {
    if (query.length > 3) {
      // Clear the previous timer if the query changes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set a new timer for 2 seconds
      timerRef.current = setTimeout(() => {
        fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}`
        )
          .then((response) => response.json())
          .then((data) => {
            const results = data.results.filter(
              (result) =>
                result.media_type === "movie" || result.media_type === "tv"
            );
            setFilteredResults(results);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, 2000); // 2 seconds delay
    } else {
      setFilteredResults([]); // Clear results when query is empty or too short
    }
  }, [query, apiKey]);

  return (
    <div className="searching-menu">
      {/* Search input */}
      <div className="w-full flex gap-10 text-white">
        <IoSearch className="w-6 h-6 p-0 mt-2  " />
        <span className="bg-col">
          <input
            type="text"
            className="mt-2 text-lg tracking-tighter	font-light mr-2border-none focus:outline-none focus:ring-0"
            placeholder="Search for movies or TV Series"
            onChange={(e) => setQuery(e.target.value)}
            style={{
              backgroundColor: "#161D2F",
              width:"100%"
            }}
          />
        </span>
      </div>

      {/* Display search results or trending component */}
      <div>
        {query.length > 0 ? (
          <SearchResults results={filteredResults} />
        ) : (
          <>
           
            <Trending />
            <Recommendation />
          </>
        )}
      </div>
    </div>
  );
}
