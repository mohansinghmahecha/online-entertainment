import React from "react";
import { CiBookmark } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";


export default function SearchResults({ results, onItemClick, onSave }) {
  return (
    <div className="trending-container mt-4">
      {results.length > 0 ? (
        results.map((result) => (
          <div
            key={result.id}
            className="trending-box"
            onClick={() => onItemClick(result.id)}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${result.poster_path})`,
              }}
            />
            <div className="overlay" />
            <div className="comp-grid">
              <div className="grid-1">
                <CiBookmark
                  className="text-white hover:cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation(); // Prevents triggering onItemClick
                    onSave(result, event);
                  }}
                />
              </div>
              <div className="grid-2">
                <div className="flex tracking-wide text-slate-400">
                  <p className="font-bold">
                    {new Date(result.release_date || result.first_air_date).getFullYear()}
                  </p>
                  &nbsp;
                  <span className="inline">
                    <GoDotFill className="inline" /> {result.media_type}
                  </span>
                  &nbsp;
                  <span className="inline">
                    <GoDotFill className="inline" />
                    {result.original_language}
                  </span>
                  &nbsp;
                </div>
                <p className="text-white text-2xl font-bold">
                  {result.title || result.name}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
