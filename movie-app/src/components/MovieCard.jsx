import React from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import fallbackImage from "../assets/placeholder.png";
import Swal from "sweetalert2";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function showMovieDetails() {
    console.log("Clicked:", movie.title);

    Swal.fire({
      title: movie.title,
      text: movie.overview,
      imageUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : fallbackImage,
      imageAlt: movie.title,
      showConfirmButton: false,
    });
  }

  return (
    <div className="movie-card">
      <div onClick={showMovieDetails} className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : fallbackImage
          }
          alt={movie.title}
          style={{ cursor: "pointer" }}
          onError={({ target }) => {
            target.onerror = null;
            target.src = fallbackImage;
          }}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p> ⭐ {movie.vote_average.toFixed(1)} </p>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
