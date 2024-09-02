import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci"; // Bookmark icon, if needed
import "../movies/movies.css";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const envmyapi = process.env.REACT_APP_MYAPI;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const apiKey = "04b3344236bbaa4bd4b56b620581e000";
  const navigator = useNavigate();

  function handlemovieclick(id) {
    navigator(`/movie-detail/${id}`);
  }
  function savingToLocalStorage(movie, event) {
    // Stop the click event from propagating to the parent element
    event.stopPropagation();
    alert("Bookmark Added ");

    // Get the existing saved movies from localStorage
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    // Add the clicked movie to the list if it's not already saved
    if (!savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
      savedMovies.push(movie);
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    }
  }

  useEffect(() => {
    const getMovie = () => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${envmyapi}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setData(result.results);
            console.log(result);
          },
          (error) => {
            setLoading(false);
            setError(error);
          }
        );
    };
    getMovie(); // Call getMovie when component mounts
  }, [envmyapi]);

  if (loading) return <p>Loading...</p>; // Display loading text while fetching
  if (error) return <p>Error: {error.message}</p>; // Display error message if any

  return (
    <div className="movie-container">
      <p className="text-3xl ml-2 text-center sm:text-start">Movies</p>

      <div className="movie-list">
        {data.map((movie) => (
          <div
            key={movie.id}
            className="movie-card hover:cursor-pointer"
            onClick={() => handlemovieclick(movie.id)}
          >
            <div className="movie-image">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            </div>
            <div className="movie-info">
              <div className="movie-details">
                <p>{movie.release_date.split("-")[0]} </p>
                {movie.adult && <span className="text-red-400">18+</span>}
              </div>
              <div className="movie-title">
                <p className="text-xl">{movie.title}</p>
              </div>
            </div>
            <div className="movie-bookmark">
              <div className="bookmark-logo">
                <CiBookmark
                  onClick={(event) => savingToLocalStorage(movie, event)}
                  className="hover:bg-white text-red-400  rounded-lg "
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
