import React from "react";
import "./Movie.css";

const Movie = ({ movie, text, setIsModal, setModalMovie }) => {
  // const { year, summary, medium_cover_image, genres, rating } = movie;
  const { title, year, summary, medium_cover_image, genres, rating } = movie;

  const setRating = () => {
    let star = "";
    for (let i = 2; i <= 10; i = i + 2) {
      if (i < rating) {
        star += "★";
      } else {
        star += "☆";
      }
    }
    return star;
  };

  return (
    <div
      className="movie"
      onClick={() => {
        setIsModal(true);
        setModalMovie(movie);
      }}
    >
      <img src={medium_cover_image} alt={title} title={title} />
      <div className="movie_data">
        <h2 className="movie_title">{text || title}</h2>
        <h3 className="movie_year">{year}</h3>
        <p className="movie_rating">
          {setRating()}
          {rating}/10
        </p>
        <ul className="movie_genre">
          {/* {genres} */}
          {genres &&
            genres.map((genre, idx) => {
              return <li key={idx}>{genre}</li>;
            })}
        </ul>
        <p className="movie_summary">
          {/* {summary} */}
          {summary !== null ? summary.slice(0, 150) : ""}...
        </p>
      </div>
    </div>
  );
};
export default Movie;
