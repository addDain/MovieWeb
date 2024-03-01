import React, { useEffect, useState } from "react";
import service from "../service/service";
import Movie from "../component/Movie";
import Headerbar from "../component/Headerbar";
// import AdminHeader from "../component/AdminHeader";
// import SearchHighlighter from "../component/SerchHighlighter";

import "./Home.css";
import Detail from "./Detail";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState();
  const [isModal, setIsModal] = useState(false);
  const [searchValue, setSearchValue] = useState();

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
  const handleSearch = (value) => {
    console.log("handleSearch", value);
    service.getSearch(value).then((res) => {
      setMovies(res.data);
      setSearchValue(value);
    });
  };

  const SearchHighlighter = (text, search) => {
    if (search === undefined) return;
    // Function to escape special characters in the search string
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    // Regular expression to find the search string in the text
    const regex = new RegExp(`(${escapeRegExp(search)})`, "gi");

    // Split the text into parts based on the search string
    const parts = text.split(regex);

    // Map through the parts and apply styles to the search string
    const highlightedText = parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ color: "red", fontWeight: 700 }}>
          {part}
        </span>
      ) : (
        part
      )
    );

    return <div>{highlightedText}</div>;
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
              text={SearchHighlighter(movie.title, searchValue)}
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
