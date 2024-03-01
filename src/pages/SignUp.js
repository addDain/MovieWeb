import React from "react";
import "./SignUp.css";

const SignUp = () => {
  const handleRegister = () => {
    return console.log("registered:)");
  };
  return (
    <div className="signupForm">
      <p>Sign Up</p>
      <div className="userId">
        {/* <label htmlFor="id">ID</label> */}
        <input type="text" id="id" placeholder="ID를 입력하세요" />
      </div>
      <br />
      <div className="userPw">
        {/* <label htmlFor="pw">PW</label> */}
        <input type="text" id="pw" placeholder="비밀번호를 입력하세요" />
      </div>
      <div className="checkPw">
        <input type="text" id="pw" placeholder="비밀번호 재입력" />
      </div>
      <br />
      <button className="btnRegi" onClick={() => handleRegister()}>
        Register
      </button>
    </div>
  );
};
export default SignUp;
