import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci"; // Bookmark icon
import { GoDotFill } from "react-icons/go";
import "../tvserial/tvserialcss.css"; // Import your CSS file

export default function TvSerialBookMark() {
  const [savedTvs, setSavedTvs] = useState([]);

  useEffect(() => {
    // Retrieve the saved TV serials from localStorage when the component mounts
    const tvs = JSON.parse(localStorage.getItem("savedTv")) || [];
    setSavedTvs(tvs);
  }, []);

  function removeFromLocalStorage(tvId) {
    // Get the existing saved TV serials from localStorage
    const savedTvs = JSON.parse(localStorage.getItem("savedTv")) || [];

    // Filter out the TV serial with the specified id
    const updatedTvs = savedTvs.filter((tv) => tv.id !== tvId);

    // Update localStorage with the new list
    localStorage.setItem("savedTv", JSON.stringify(updatedTvs));

    // Update the state
    setSavedTvs(updatedTvs);
  }

  return (
    <div className="movie-container">
      <p className="text-white text-2xl font-bold mb-4">
        Bookmark Of TvShows Item
      </p>
      <div className="movie-list">
        {savedTvs.length > 0 ? (
          savedTvs.map((tv) => (
            <div key={tv.id} className="movie-card hover:cursor-pointer">
              <div className="movie-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.name}
                  className="movie-poster"
                />
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
                    className="text-red-800 bg-white rounded-lg hover:bg-transparent"
                    onClick={() => removeFromLocalStorage(tv.id)}
                  />
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
