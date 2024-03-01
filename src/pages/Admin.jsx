import React, { useEffect, useState } from "react";
import service from "../service/service";
import Movie from "../component/Movie";
import AdminHeader from "../component/AdminHeader";

import "./Home.css";
import Detail from "./Detail";

const Admin = () => {
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

  // 헤더바 서치
  const handleSearch = async (value) => {
    await service.getSearch(value).then((res) => {
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
      <AdminHeader handleSearch={handleSearch} />
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

export default Admin;
