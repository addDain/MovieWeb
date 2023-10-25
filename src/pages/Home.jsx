import React, { useEffect, useState } from "react";
import service from "../service/service";
import Movie from "../component/Movie";
import Headerbar from "../component/Headerbar";

import "./Home.css";
import Detail from "./Detail";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState();
  const [isModal, setIsModal] = useState(false);

  // 페이지 로딩시 영화정보 로딩
  const getMovies = async () => {
    await service.getMovies().then((res) => {
      const movies = res.data;
      setMovies(movies);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  // 헤더바 인풋 관리
  const handleSearch = async (value) => {
    await service.getSearch(value).then((res) => {
      setMovies(res.data);
    });
  };

  const handleStar = async () => {
    await service.getStar().then((res) => {
      setMovies(res.data);
    });
  };
  const handleYear = async () => {
    await service.getYear().then((res) => {
      setMovies(res.data);
    });
  };

  //Detail 모달창 관리
  const [modalMovie, setModalMovie] = useState();
  const handleCancel = () => {
    setIsModal(false);
    getMovies();
  };

  return (
    <div className="container">
      <Headerbar
        handleSearch={handleSearch}
        handleStar={handleStar}
        handleYear={handleYear}
      />
      {isLoading ? (
        <div className="loader">
          <span>loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              setIsModal={setIsModal}
              setModalMovie={setModalMovie}
            />
          ))}
        </div>
      )}
      {isModal && (
        <Detail isModal={isModal} movie={modalMovie} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Home;
