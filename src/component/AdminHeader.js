import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Modal } from "antd";
import "./Headerbar.css";
import service from "../service/service";
import { useNavigate } from "react-router-dom";
// import Logout from "../pages/Logout";
import logo from "../logo.png";

const AdminHeader = ({ handleSearch }) => {
  const [newInput, setNewInput] = useState();
  const [addModal, setAddModal] = useState(false);
  const [titleInfo, setTitleInfo] = useState();
  const [yearInfo, setYearInfo] = useState();
  const [starInfo, setStarInfo] = useState();
  const [genreInfo, setGenreInfo] = useState([]);
  const [sinopsisInfo, setSinopsisInfo] = useState();
  const navigate = useNavigate();

  // 헤더바 영화 추가
  const handleMovie = async (movie) => {
    await service
      .updateMovie(movie)
      .then((res) => {
        // setMovies(res.data);
        console.log("newdata", res.data);
      })
      .finally(() => {
        setTitleInfo("");
        setYearInfo("");
        setStarInfo("");
        setGenreInfo([]);
        setSinopsisInfo("");
      });
  };

  const handleInput = (e) => {
    setNewInput(e.target.value);
  };
  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(newInput);
  };

  const showModal = (e) => {
    setAddModal(true);
  };

  const handleOk = () => {
    setAddModal(false);
  };

  const handleCancel = () => {
    setAddModal(false);
  };

  const randomID = Math.floor(Math.random() * 200);
  const handleSave = () => {
    if (!titleInfo) {
      return alert("제목을 입력해주세요.");
    } else if (!yearInfo) {
      return alert("개봉일을 입력해주세요.");
    } else if (!starInfo) {
      return alert("벌점을 작성해주세요.");
    }
    handleMovie({
      id: randomID,
      medium_cover_image: newImg,
      large_cover_image: newImg,
      title: titleInfo,
      year: yearInfo,
      rating: starInfo,
      genres: genreInfo || null,
      summary: sinopsisInfo || null,
    });
    setAddModal(false);
  };

  // 로그아웃 버튼
  const clickLogout = () => {
    navigate("/login");
    localStorage.clear();
    window.location.reload();
  };

  // 사진 업로드 미리보기
  const [newImg, setNewImg] = useState(null);
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setNewImg(reader.result || null);
        resolve();
      };
    });
  };

  const resetPage = () => {
    window.location.reload();
  };

  return (
    <div className="header">
      <img src={logo} alt="logo" onClick={resetPage} />
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
        <button className="addMovie" onClick={showModal}>
          + 영화추가
        </button>
        <Modal
          open={addModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <div className="newInfo" style={{ display: "flex", padding: 10 }}>
            <div
              className="imgUpload"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "200px",
              }}
            >
              <img
                src={newImg}
                alt="업로드이미지"
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                  height: "250px",
                }}
              />
              <input
                type="file"
                accept="image/*"
                required
                multiple
                style={{ maxWidth: "200px" }}
                onChange={(e) => onUpload(e)}
              />
            </div>
            <div className="inputGR">
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginTop: 30,
                }}
              >
                <li>
                  <label htmlFor="title">
                    Title
                    <input
                      type="text"
                      id="title"
                      placeholder="영화제목을 입력해주세요."
                      onChange={(e) => setTitleInfo(e.target.value)}
                      style={{
                        width: 300,
                        height: 24,
                        marginBottom: 20,
                        marginLeft: 10,
                      }}
                    />
                  </label>
                </li>
                <li>
                  <label htmlFor="year">
                    Relese
                    <input
                      type="text"
                      id="year"
                      placeholder="개봉년도를 입력해주세요."
                      onChange={(e) => setYearInfo(e.target.value)}
                      style={{
                        width: 300,
                        height: 24,
                        marginBottom: 20,
                        marginLeft: 10,
                      }}
                    />
                  </label>
                </li>
                <li>
                  <label htmlFor="rating">
                    Rating
                    <input
                      type="text"
                      id="rating"
                      placeholder="별점 입력해주세요. 10점 만점"
                      onChange={(e) => setStarInfo(e.target.value)}
                      style={{
                        width: 300,
                        height: 24,
                        marginBottom: 20,
                        marginLeft: 10,
                      }}
                    />
                  </label>
                </li>
                <li>
                  <label htmlFor="genre">
                    Genre
                    <input
                      type="text"
                      id="genre"
                      placeholder="영화장르를 입력해주세요."
                      onChange={(e) => setGenreInfo([e.target.value])}
                      style={{
                        width: 300,
                        height: 24,
                        marginBottom: 20,
                        marginLeft: 10,
                      }}
                    />
                  </label>
                </li>
                <li>
                  <label htmlFor="summary">
                    Synopsis
                    <input
                      type="text"
                      id="summary"
                      placeholder="영화 시놉시스를 입력해주세요."
                      onChange={(e) => setSinopsisInfo(e.target.value)}
                      style={{
                        width: 300,
                        height: 20,
                        marginLeft: 10,
                      }}
                    />
                  </label>
                </li>
                <button
                  onClick={handleSave}
                  style={{
                    width: 150,
                    border: "1px solid rgb(181, 137, 255)",
                    borderRadius: 5,
                    backgroundColor: "transparent",
                    height: 30,
                    marginTop: 10,
                    cursor: "pointer",
                  }}
                >
                  저장
                </button>
              </ul>
            </div>
          </div>
        </Modal>
        <button className="logout" onClick={clickLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
