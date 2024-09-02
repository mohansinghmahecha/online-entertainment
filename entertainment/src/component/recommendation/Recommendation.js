import React, { useEffect, useState, useCallback } from "react";
import "./recommendationcss.css";
import { CiBookmark } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_MYAPI;
const TO_PRATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

export default function Recommendation() {
  const nav = useNavigate();
  const [recommendationList, setRecommendationList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  // Fetch top-rated movies from the API
  const fetchTopRated = async () => {
    try {
      const response = await fetch(TO_PRATED_URL);
      const data = await response.json();
      const topMovies = data.results.slice(0, 3);
      setRecommendationList(topMovies);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    }
  };

  // Fetch saved movies from local storage and update recommendation list
  const updateRecommendationList = useCallback((topMovies) => {
    const savedMoviesFromStorage =
      JSON.parse(localStorage.getItem("savedMovies")) || [];

    // Filter out saved movies that are already in the recommendation list
    const filteredSavedMovies = savedMoviesFromStorage.filter(
      (savedMovie) =>
        !topMovies.some((recMovie) => recMovie.id === savedMovie.id)
    );

    // Merge top movies with limited saved movies
    const limitedSavedMovies = filteredSavedMovies.slice(0, 5);
    const mergedList = [...topMovies, ...limitedSavedMovies];

    // Remove duplicates and limit to 5 items
    const uniqueList = Array.from(
      new Map(mergedList.map((movie) => [movie.id, movie])).values()
    ).slice(0, 5);

    setRecommendationList(uniqueList);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const initRecommendationList = async () => {
      await fetchTopRated();
      const topMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
      updateRecommendationList(topMovies);
    };

    initRecommendationList();
  }, [updateRecommendationList]);

  // Navigate to the movie detail page
  function handleClick(id) {
    nav(`/movie-detail/${id}`);
  }

  // Save a movie to local storage and update the recommendation list
  function saveToLocalStorage(movie, event) {
    event.stopPropagation();
    alert("Bookmark Added");

    const updatedSavedMovies = [...savedMovies, movie];
    localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
    setSavedMovies(updatedSavedMovies);
  }

  return (
    <div className="mb-4">
      <div>
        <p className="text-3xl  mt-10">Recommendation List for you</p>
      </div>
      <div className="trending-container mt-4">
        {recommendationList.map((movie) => (
          <div
            key={movie.id}
            className="trending-box hover:cursor-pointer"
            onClick={() => handleClick(movie.id)}
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
                {!savedMovies.some(
                  (savedMovie) => savedMovie.id === movie.id
                ) && (
                  <CiBookmark
                    className="text-white hover:cursor-pointer"
                    onClick={(event) => saveToLocalStorage(movie, event)}
                  />
                )}
              </div>
              <div className="grid-2">
                <div className="flex tracking-wide text-slate-400">
                  <p className="font-bold">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  &nbsp;
                 
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
