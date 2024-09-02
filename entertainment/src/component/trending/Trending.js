import React, { useEffect, useState } from "react";
import "./trending.css";
import { CiBookmark } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_MYAPI;
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

export default function Trending() {
  const nav = useNavigate();
  const [movies, setMovies] = useState([]);

  function trandingOnClick(id) {
    nav(`/movie-detail/${id}`);
  }

  function savingToLocalStorage(movie, event) {
    event.stopPropagation();
    alert("Bookmark Added ");
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    if (!savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
      savedMovies.push(movie);
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <div>
        <p className="mt-4 text-4xl md:text-start text-center ">
          Trending
        </p>
      </div>
      <div className="trending-container mt-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="trending-box hover:cursor-pointer"
            onClick={() => trandingOnClick(movie.id)}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              }}
            />
            <div className="overlay" />
            <div className="comp-grid">
              <div className="grid-1">
                <CiBookmark
                  className="text-white hover:cursor-pointer"
                  onClick={(event) => savingToLocalStorage(movie, event)}
                />
              </div>
              <div className="grid-2">
                <div className="flex tracking-wide text-slate-400">
                  <p className="font-bold">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  &nbsp;
                  <span className="inline">
                    <GoDotFill className="inline" /> {movie.media_type}
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
        ))}
      </div>
    </div>
  );
}
