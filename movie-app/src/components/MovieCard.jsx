import React from "react";
import "../css/MovieCard.css";
import "../css/MovieDetail.css";
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
    const backgroundImage = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`
      : fallbackImage;

    Swal.fire({
      html: `
        <div class="popup-container">
          <div class="popup-overlay">
          <div class="popup-content">
            <div class="popup-left">
              <h2 class="popup-title">${movie.title}</h2>
              <p><strong>Release:</strong> ${
                movie.release_date?.split("-")[0]
              }</p>
              <p><strong>Rating:</strong> ⭐ ${movie.vote_average.toFixed(
                1
              )}</p>
            </div>
            <div class="popup-right">
              <p class="popup-overview">${movie.overview}</p>
            </div>
          </div>
          </div>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "X",
      customClass: {
        popup: "fullscreen-popup",
        confirmButton: "popup-close-btn",
      },
      background: "none",
      width: "90vw",
      padding: 0,
    });

    // Dynamically set the background image after popup loads
    setTimeout(() => {
      const container = document.querySelector(".popup-container");
      if (container) {
        container.style.backgroundImage = `
          linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.5)), 
          url('${backgroundImage}')
        `;
      }
    }, 0);
  }

  return (
    <div className="movie-card">
      <div
        onClick={showMovieDetails}
        className="movie-poster"
        style={{ cursor: "pointer" }}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : fallbackImage
          }
          alt={movie.title}
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
