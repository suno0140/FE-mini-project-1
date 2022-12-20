import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosDB } from "../api/axiosAPI";

import { Cookies } from "react-cookie"

const cookies = new Cookies()

const setCookie = (id, value, option) =>{
  return cookies.set(id, value, {...option})
}
export const getCookie = (id) =>{
  return cookies.get(id)
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");


  const postLogin = async (post) => {
    try {
      const data = await axiosDB.post("/api/members/login", post);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   postLogin({
  //     userid,
  //     password,
  //   }).then((res) => {
  //     localStorage.setItem("id", res.headers.authorization);
  //   });
    const onSubmit = (e) => {
      e.preventDefault();
      postLogin({
        userid,
        password,
      }).then((res) => {
        setCookie("id", res.headers.authorization,{
          path: "/",
          maxAge: 240,
        });
      });

    // .catch((error) => useSweet(1000, "error", error.response.data.msg));
  };

  return (
    <>
      <StcontainerBox>
        <StForm>
          <StTitle>로그인</StTitle>
          <Stlabel>아이디</Stlabel>
          <StInput
            name="userid"
            type="email"
            onChange={(e) => {
              const { value } = e.target;
              setUserId(value);
            }}
          ></StInput>
          <Stlabel>비밀번호</Stlabel>
          <StInput
            type="password"
            name="password"
            onChange={(e) => {
              const { value } = e.target;
              setPassword(value);
            }}
          ></StInput>
          <br />
          <StButtonBox>
            <StSignupBtn
              onClick={() => {
                navigate(`/signup`);
              }}
            >
              회원가입
            </StSignupBtn>
            <StSignupBtn
              onClick={(event) => {
                onSubmit(event);
              }}
            >
              로그인
            </StSignupBtn>
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
