import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
// import { useAuth } from "../auth/Auth";
// import service from "../service/service";

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleLogin = () => {
    // 1. id, pw
    if (inputId === "admin" && inputPw === "admin") {
      // 2. localstorage.set()
      localStorage.setItem("grade", "admin");
      // 3. navigate
      setTimeout(navigate("/admin"), 1000);
    } else if (inputId === "user1" && inputPw === "1") {
      localStorage.setItem("grade", "user1");

      setTimeout(navigate("/home"), 1000);
    } else if (inputId === "user2" && inputPw === "2") {
      localStorage.setItem("grade", "user2");

      setTimeout(navigate("/home"), 1000);
    } else {
      return alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="loginForm">
      <p>Log In</p>
      <div className="userId">
        <input
          type="text"
          id="id"
          placeholder="ID를 입력해주세요."
          value={inputId}
          onChange={handleInputId}
        />
      </div>
      <div className="userPw">
        <input
          type="password"
          id="pw"
          placeholder="비밀번호를 입력해주세요."
          value={inputPw}
          onChange={handleInputPw}
        />
      </div>
      <br />
      <button className="btnLogin" onClick={handleLogin}>
        Login
      </button>
      {/* <button className="btnRegi" onClick={() => handleRegister()}>
        Register
      </button> */}
    </div>
  );
};
export default Login;

// const handleLogin = async (data) => {
//   const info = {
//     id: inputId,
//     pw: inputPw,
//   };
//   await service.loginToken(info.id, info.pw).then((res) => {
//     if (res.status === 200) {
//       const result = data[0];
//       localStorage.setItem("accessToken", result.access_token);
//       localStorage.setItem("refreshToken", result.refresh_token);

//       if (result.status === 401) {
//         console.log(result.msg);
//       } else if (result.status === 402) {
//         console.log(result.msg);
//       } else {
//         navigate("/home");
//       }
//     } else {
//       alert("시스템에 문제가 생겼습니다");
//     }
//   });
//   login(inputId && inputPw);
//   navigate("/home");
// };
// const handleSearch = async (value) => {
//   await service.getSearch(value).then((res) => {
//     setMovies(res.data);
//   });
// };

// const handleRegister = () => {
//   return console.log("Go register:)");
// };
