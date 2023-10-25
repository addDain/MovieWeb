import React, { useState, useEffect, useRef } from "react";
import service from "../service/service";
import { Modal } from "antd";
import "./Detail.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BiTrash } from "react-icons/bi";

const Detail = ({ isModal, onCancel, movie }) => {
  const [data, setData] = useState(movie);
  const { id, title, year, summary, large_cover_image, genres, rating, like } =
    data;

  // 별점 표시
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

  // like 이벤트 - json 서버에 데이터 전달
  const changeLike = () => {
    const result = { like: !like };
    service.setLike(id, result).then((res) => {
      if (res.status === 200) {
        getLikes();
      }
    });
  };
  // json 서버에서 받은 like 데이터 setData에 담아서 업데이트
  const getLikes = () => {
    service.getLike(id).then((res) => {
      setData(res.data);
    });
  };

  // comments 시작
  const [comments, setComments] = useState([]);
  const getComments = () => {
    service
      .getComment(id)
      .then((res) => {
        setComments(res.data.list);
      })
      .catch((e) => {
        setComments([]);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  // const newName = useRef();
  const newText = useRef();

  // user 네임 가져오기
  const userName = localStorage.getItem("grade");

  const handleComments = () => {
    // const userName = newName.current.value;
    const text = newText.current.value;

    if (!userName) {
      return alert("이름을 입력해주세요.");
    } else if (!text) {
      return alert("댓글을 입력해주세요.");
    }

    if (comments.length === 0) {
      const push = {
        id: data.id,
        list: [{ id: Date.now(), userName: userName, text: text }],
      };
      service
        .add2Comment(id, push)
        .then((res) => {
          if (res.status === 200) {
            getComments();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      service
        .newComment(push)
        .then((res) => {
          if (res.status === 200) {
            getComments();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          getComments();
          // newName.current.value = "";
          newText.current.value = "";
        });
    } else {
      const push = {
        list: [...comments, { id: Date.now(), userName: userName, text: text }],
      };
      service
        .addComment(id, push)
        .then((res) => {
          if (res.status === 200) {
            getComments();
            // newName.current.value = "";
            newText.current.value = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //영화 삭제
  const onDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      service.deleteMovie(id).then((res) => {
        if (res.status === 200) {
          alert("삭제 되었습니다.");
        }
      });
    } else {
      return;
    }
    window.location.reload();
  };

  // 댓글 삭제
  const commentDelete = (id, listId) => {
    let editComment = comments.filter((comment) => comment.id !== listId);
    const payload = {
      id: id,
      list: editComment,
    };
    service
      .deleteComment(id, payload)
      .then((res) => {
        if (res.status === 200) {
          alert("삭제 성공!");
          getComments();
          updateComments();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 댓글 정보 업데이트
  const updateComments = () => {
    service
      .upComments()
      .then((res) => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getComments();
      });
  };

  const isAdmin = localStorage.getItem("grade") === "admin";
  let userId = localStorage.getItem("grade");
  return (
    <Modal open={isModal} onOk={onCancel} onCancel={onCancel} width="900px">
      <div className="detail">
        <div>
          {isAdmin ? (
            <button className="deleteBtn" onClick={onDelete}>
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="movie_data">
          <img src={large_cover_image} alt={title} title={title} />
          <h2 className="movie_title">{title}</h2>
          <h3 className="movie_year">{year}</h3>
          <div onClick={() => changeLike()}>
            {like ? <FcLike /> : <FcLikePlaceholder />}
          </div>
          <p className="movie_rating">
            {setRating()}
            {rating}/10
          </p>
          <ul className="movie_genre">
            {genres &&
              genres.map((genre, idx) => {
                return <li key={idx}>{genre}</li>;
              })}
          </ul>
          <p className="movie_summary">
            {summary !== null ? summary.slice(0, 1300) : ""}
          </p>
        </div>
        <div className="comments_area">
          <p>COMMENTS</p>
          <div className="comments">
            {comments.map((item) => {
              const itemId = item.id;
              return (
                <ul key={itemId}>
                  <li className="username">{item.userName}</li>
                  <li className="comment">{item.text}</li>
                  {item && (item.userName === userId || isAdmin) && (
                    <button
                      className="commentBtn"
                      style={{ width: "80px", marginLeft: 10 }}
                      onClick={() => commentDelete(id, item.id)}
                    >
                      <BiTrash />
                    </button>
                  )}
                </ul>
              );
            })}
          </div>
          <div className="new_comment">
            <div className="userName">{userName}</div>
            {/* <input
              className="newUserName"
              ref={newName}
              placeholder="이름"
            ></input> */}
            <input
              className="newText"
              ref={newText}
              placeholder="댓글을 입력해주세요"
            ></input>
            <button onClick={() => handleComments()}>게시</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Detail;
