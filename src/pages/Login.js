import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { __loginRequest } from "../redux/modules/loginSlice";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const [login, setLogin] = useState({
    userid: "",
    password: "",
  });
  const onClickLogin = () => {
    if (login.userid.trim() === "" || login.password.trim() === "") {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }
    dispatch(__loginRequest(login));
  };

  const onClickSignup = () => {
    navigate(`/signup`);
  };
  return (
    <>
      <StcontainerBox>
        <StForm>
          <StTitle>로그인</StTitle>
          <Stlabel>아이디</Stlabel>
          <StInput name="userid" type="email"></StInput>
          <Stlabel>비밀번호</Stlabel>
          <StInput type="password" name="password"></StInput>
          <br />
          <StButtonBox>
            <StSignupBtn
              onClick={() => {
                onClickSignup();
              }}
            >
              회원가입
            </StSignupBtn>
            <StSignupBtn onClick={onClickLogin}>로그인</StSignupBtn>
          </StButtonBox>
        </StForm>
      </StcontainerBox>
    </>
  );
}

export default Login;

const StcontainerBox = styled.div`
  margin: 10px 10px 30px 30px;
  width: 90%;
  min-width: 800px;
  padding: 30px 30px 30px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StTitle = styled.div`
  font-size: 50px;
  margin: 50px 50px 20px 50px;
  padding: 50px 50px 20px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color2);
`;

const Stlabel = styled.label`
  margin: 15px 0 10px 0;
  color: var(--color2);
`;

const StInput = styled.input`
  margin: 10px 10px 10px 0px;
  padding: 5px 0px 5px 0px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StSignupBtn = styled(Button)`
  height: 40px;
  width: 90px;
  margin: 5px 0 0 10px;
  flex-direction: row;
`;
const StButtonBox = styled.div`
  margin: 20px 0px 0 60px;
`;
