import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { __addSignup } from "../redux/modules/signupSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, setSignup] = useState({
    userid: "",
    nickname: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const changeInput = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const onClickLogin = () => {
    navigate(`/login`);
  };

  const onClickSignup = () => {
    if (
      signup.userid.trim() === "" ||
      signup.password.trim() === "" ||
      signup.nickname.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("빈칸을 입력해주세요");
      return;
    } else if (signup.nickname !== confirmPassword) {
      alert("비밀번호를 확인하세요");
      return;
    }
    dispatch(__addSignup(signup));
  };

  return (
    <>
      <StcontainerBox>
        <StForm>
          <StTitle>회원가입</StTitle>
          <Stlabel>아이디</Stlabel>
          <Stdiv>
            <StInput
              onChange={changeInput}
              name="userid"
              type="email"
            ></StInput>
            <StConfirmBtn>중복체크</StConfirmBtn>
          </Stdiv>

          <Stlabel>닉네임</Stlabel>
          <Stdiv>
            <StInput
              onChange={changeInput}
              name="nickname"
              type="text"
            ></StInput>
            <StConfirmBtn>중복체크</StConfirmBtn>
          </Stdiv>
          <Stlabel>비밀번호</Stlabel>
          <StInput
            type="password"
            onChange={changeInput}
            name="password"
          ></StInput>
          <Stlabel>비밀번호확인</Stlabel>
          <StInput
            type="password"
            onChange={(e) => {
              const { value } = e.target;
              setConfirmPassword(value);
            }}
          ></StInput>
          <br />
          <StButtonBox>
            <StSignupBtn
              onClick={() => {
                onClickLogin();
              }}
            >
              뒤로가기
            </StSignupBtn>
            <StSignupBtn onClick={onClickSignup}>회원가입</StSignupBtn>
          </StButtonBox>
        </StForm>
      </StcontainerBox>
    </>
  );
}

export default Signup;

const StcontainerBox = styled.div`
  margin: 50px 10px 30px 30px;
  width: 90%;
  min-width: 800px;
  padding: 30px 30px 30px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 400px;
`;
const Stdiv = styled.div`
  display: flex;
  width: 400px;
`;
const StTitle = styled.div`
  font-size: 50px;
  margin: 0px 50px 0px 50px;
  padding: 50px 50px 30px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color2);
`;
const Stlabel = styled.label`
  margin: 25px 10px 10px 0;
  color: var(--color2);
`;

const StInput = styled.input`
  margin: 10px 10px 10px 0px;
  padding: 5px 0px 5px 0px;
  width: 100%;
`;
const StSignupBtn = styled(Button)`
  height: 40px;
  width: 90px;
  margin: 5px 0 0 10px;
`;
const StButtonBox = styled.div`
  margin: 0 auto;
`;
const StConfirmBtn = styled(Button)`
  width: 100px;
  height: 30px;
  margin: 11px;
`;
