import React, { useEffect, useState } from "react";
import "./tvdetailpage.css"; // Import your CSS file
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function TvDetailPage() {
  const envmyapi = process.env.REACT_APP_MYAPI;
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  function getStarRating(voteAverage) {
    const maxStars = 5; // Maximum stars in your rating system
    const maxVoteAverage = 10; // Maximum rating from the API

    // Convert the vote average to a 5-star rating
    return (voteAverage / maxVoteAverage) * maxStars;
  }

  useEffect(() => {
    document.body.style.background = "#10141E";
    setLoading(true); // Ensure loading state is true when fetching
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${envmyapi}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status_code) {
            // Handle error response from API
            setLoading(false);
            setError(result);
            setMovie(null); // Ensure movie is set to null on error
          } else {
            // Successful response
            setLoading(false);
            setMovie(result);
            setError(null); // Clear any previous errors
          }
        },
        (error) => {
          setLoading(false);
          setError(error);
          setMovie(null); // Ensure movie is set to null on network error
        }
      );
  }, [id,envmyapi]); // Fetch movie details whenever `id` changes

  if (loading)
    return <p className="text-center text-4xl font-bold mt-10">Loading...</p>;
  if (error) {
    if (error.status_code === 34) {
      return (
        <p className="text-center text-4xl font-bold mt-10">No movie found.</p>
      );
    }
    return (
      <p className="text-center text-4xl font-bold mt-10">
        Error: {error.status_message || error.message}
      </p>
    );
  }
  if (!movie)
    return (
      <div className="movie-detail-container">
        <p className="text-center text-4xl font-bold mt-10">No movie found.</p>
      </div>
    );

  // Calculate star rating
  const starRating = getStarRating(movie.vote_average);

  return (
    <div className="movie-detail-container">
      <div className="detail-container">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster-item"
          />
        </div>
        <div className="flex flex-col mt-[30px] second-grid">
          <div>
            <h1 className="text-5xl tracking-wider">{movie.original_name}</h1>
          </div>
          <div>
            <p className="font-light text-xl tracking-tighter text-slate-500">
              {movie.tagline}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-3xl mt-2 font-semibold">
              {starRating.toFixed(1)}
            </p>
            {/* Display rating with 1 decimal place */}
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              value={starRating} // Pass the calculated rating value here
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              edit={false} // Make the stars non-editable
            />
          </div>
          <div>
            <p>Country:&nbsp; {movie.origin_country}</p>
          </div>
          <div className="mt-4">
            <p>Genrus</p>
            <p className="mt-2"></p>
            {movie.genres.map((item) => {
              return (
                <span
                  key={item.id}
                  className=" p-2 ml-1  w-auto bg-white rounded-lg text-black"
                >
                  {item.name}
                </span>
              );
            })}
          </div>
          <div className="mt-10">
            <p className="text-2xl font-bold tracking-widest">
              Discription: &nbsp;
            </p>
            <hr className="w-[250px]" />
            <p className="text-xl mr-4">{movie.overview}</p>
          </div>

          <div className="mt-10">
            <p>Casts: &nbsp;{movie.status}</p>
            <p>Type: &nbsp;{movie.type}</p>
            <p className="mt-2">Total Episoads: &nbsp;{movie.number_of_episodes}</p>
            <p>Total Seasons: &nbsp;{movie.number_of_seasons}</p>
          </div>
          <div className="mt-10 flex gap-4">
            <p className="block">Networks: &nbsp;</p>
            {movie.networks.map((items)=>{
                return (<div key={items.id} className="flex flex-row">
                 <span className="bg-yellow-300 text-black font-bold p-2 rounded-lg">{items.name}</span>
                </div>)
            })}
          </div>
          <button style={{
            marginTop:"80px",
            marginBottom:"30px"

          }}>
          <Link to="/" className=" p-4 bg-red-400"> Let's Go Home </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
