import React, { useEffect, useState } from "react";
import "./bookmarkmovies.css"; // Ensure you import the CSS for styling
import { CiBookmark } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Bookmark() {
  const navigator = useNavigate();
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    // Retrieve the saved movies from localStorage when the component mounts
    const movies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMovies(movies);
  }, []);

  const handleRemoveBookmark = (movieId,event) => {
     event.stopPropagation();
    // Get the existing saved movies from localStorage
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    // Filter out the movie to be removed
    const updatedMovies = savedMovies.filter((movie) => movie.id !== movieId);

    // Save the updated list back to localStorage
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));

    // Update the state to reflect changes
    setSavedMovies(updatedMovies);
  };

  const newDetailpage = (m) => {
    navigator(`/movie-detail/${m}`);
  };

  return (
    <div>
      <div className="block mt-10">
        <p className="text-white text-2xl font-bold mb-4 sm:text-center md:text-start">
          Bookmark Of Movies Item
        </p>
      </div>
      <div className="bookmark-t-container mt-4">
        {savedMovies.length > 0 ? (
          savedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bookmark-trending-box"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              }}
              onClick={() => newDetailpage(movie.id)}
            >
              <div className="overlay" />
              <div className="comp-grid">
                <div className="grid-1">
                  <CiBookmark
                    className="text-white hover:cursor-pointer"
                    onClick={(event) => handleRemoveBookmark(movie.id,event)}
                  />
                </div>
                <div className="grid-2">
                  <div className="flex tracking-wide text-slate-400">
                    <p className="font-bold">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                    &nbsp;
                    <span className="inline">
                      <GoDotFill className="inline" /> Movies
                    </span>
                    &nbsp;
                    <span className="inline">
                      <GoDotFill className="inline" />
                      {movie.original_language}
                    </span>
                    &nbsp;
                  </div>
                  <p className="text-white text-2xl font-bold">{movie.title}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No bookmarks found.</p>
        )}
      </div>
    </div>
  );
}
