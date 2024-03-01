import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Headerbar.css";
import { useNavigate } from "react-router-dom";
// import Logout from "../pages/Logout";
import logo from "../logo.png";
// import SearchHighlighter from "./SerchHighlighter";

const Headerbar = ({ handleSearch, handleStar, handleYear }) => {
  const [newInput, setNewInput] = useState();
  const [selectStar, setSelectStar] = useState();
  const [selectYear, setSelectYear] = useState();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setNewInput(e.target.value);
    // SearchHighlighter(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(newInput);
  };

  const searchStar = (e) => {
    setSelectStar(e.target.value);
    handleStar(selectStar);
  };
  const searchYear = (e) => {
    setSelectYear(e.target.value);
    handleYear(selectYear);
  };

  //로그아웃
  const clickLogout = () => {
    navigate("/login");
    localStorage.clear();
    window.location.reload();
  };

  //로고 클릭시 리프레쉬
  const logoClick = () => {
    window.location.reload();
  };

  return (
    <div className="header">
      <img src={logo} alt="logo" onClick={logoClick} />
      <div className="headerfun">
        <input
          className="search"
          type="text"
          placeholder="검색어 입력"
          onChange={handleInput}
        ></input>
        <button onClick={onSearch}>
          <BsSearch />
        </button>
        <div>
          <label htmlFor="star">
            <input type="radio" id="star" name="select" onChange={searchStar} />
            별점순
          </label>
          <label htmlFor="year">
            <input type="radio" id="year" name="select" onChange={searchYear} />
            최신순
          </label>
        </div>
        <button className="logout" onClick={clickLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};
export default Headerbar;
