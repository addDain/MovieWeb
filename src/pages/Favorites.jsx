import React, { useEffect, useState } from "react";
import service from "../service/service";
import Movie from "../component/Movie";
import Detail from "./Detail";
import "./Favorites.css";

const Favorites = () => {
  const [movies, setMovies] = useState();
  const [isModal, setIsModal] = useState(false);
  const [modalMovie, setModalMovie] = useState();

  const getMovies = async () => {
    await service.getMovies().then((res) => {
      const movies = res.data;
      const filterLikes = movies.filter((result) => result.like === true);
      setMovies(filterLikes);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleCancel = () => {
    setIsModal(false);
    getMovies();
  };
  return (
    <section className="favorites">
      <div className="movies">
        {movies &&
          movies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              setIsModal={setIsModal}
              setModalMovie={setModalMovie}
            />
          ))}
        {isModal && (
          <Detail
            isModal={isModal}
            movie={modalMovie}
            onCancel={handleCancel}
          />
        )}
      </div>
    </section>
  );
};
export default Favorites;
