import React, { useEffect, useState, useCallback } from "react";
import { CiBookmark } from "react-icons/ci"; // Bookmark icon
import { GoDotFill } from "react-icons/go";
import "../tvserial/tvserialcss.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import PlayButton from "../playbutton/PlayButton";

export default function Movies() {
  const envmyapi = process.env.REACT_APP_MYAPI;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const navigatingtv = useNavigate();

  function tvonclickhandle(id) {
    navigatingtv(`/tv-serial-detail/${id}`);
  }

  function savingToLocalStoragefortv(tvshows, event) {
    alert("Bookmark Added");
    event.stopPropagation();
  
    // Get the existing saved TV serials from localStorage
    const savedTvs = JSON.parse(localStorage.getItem("savedTv")) || [];

    // Add the clicked TV serial to the list if it's not already saved
    if (!savedTvs.some((savedTv) => savedTv.id === tvshows.id)) {
      savedTvs.push(tvshows);
      localStorage.setItem("savedTv", JSON.stringify(savedTvs));
    }
  }

  // Memoized function to fetch TV data
  const getTvFunction = useCallback(
    (page = 1) => {
      setLoading(true); // Set loading to true before fetching
      fetch(
        `https://api.themoviedb.org/3/discover/tv?include_adult=true&api_key=${envmyapi}&page=${page}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setData(result.results);
            setTotalPages(result.total_pages); // Update total pages
          },
          (error) => {
            setLoading(false);
            setError(error);
          }
        );
    },
    [envmyapi]
  ); // Dependency on envmyapi

  // Initial data fetch
  useEffect(() => {
    getTvFunction(currentPage); // Fetch data for the current page
  }, [currentPage, getTvFunction]); // Include getTvFunction in dependency array

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      getTvFunction(page); // Fetch data for the selected page
    }
  };

  if (loading) return <p>Loading...</p>; // Display loading text while fetching
  if (error) return <p>Error: {error.message}</p>; // Display error message if any

  return (
    <div className="movie-container">
      <h1 className="text-5xl text-center">TV Serials</h1>
      <div className="movie-list">
        {data.map((tv) => (
          <div
            key={tv.id}
            className="movie-card hover:cursor-pointer"
            onClick={() => tvonclickhandle(tv.id)}
          >
            <div className="movie-image">
              <img
                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                alt={tv.name}
                className="movie-poster"
              />
              <PlayButton/>
            </div>
            <div className="movie-info">
              <div className="movie-details flex gap-2 font-thin">
                <GoDotFill className="mt-1" />
                <span>{tv.first_air_date.split("-")[0]}</span>
                {tv.adult && <span className="text-red-400">18+</span>}
                <GoDotFill className="mt-1 text-red-500" />
                <span>{tv.origin_country}</span>
                <span>TV</span>
              </div>
              <div className="movie-title">
                <p className="text-xl">{tv.name}</p>
              </div>
            </div>
            <div className="movie-bookmark">
              <div className="bookmark-logo">
                <CiBookmark
                  className="text-red-800 hover:bg-white hover:rounded-md"
                  onClick={(event) => savingToLocalStoragefortv(tv, event)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button
          className="bg-red-500 p-2 m-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-red-500 p-2 m-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
