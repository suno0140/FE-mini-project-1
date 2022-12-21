import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { axiosDB } from "../../api/axiosAPI";
import { encrypt } from "./Encrypt";
import { setCookies, getCookies } from "../../api/cookieControler";

import Swal from "sweetalert2";

function LoginForm() {
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const postLogin = async (post) => {
    try {
      const password = encrypt(post.password);
      console.log(password);
      const userInfo = { userid, password };
      const data = await axiosDB.post("/api/members/login", userInfo);
      if (data.data.statusCode === 201) {
        return data;
      } else {
        Swal.fire(
          '',
          '아이디, 비밀번호를 잘못입력하셨습니다.',
          'warning'
        )
      }
    } catch (error) {
      console.log(error);
    }
  };
  const kakao = (e) => {
    e.preventDefault();
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=00a53b1769c1cc0a1142657ec7e2b793&redirect_uri=http://localhost:3000&response_type=code";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userid === "" || password === "") {
      Swal.fire(
        '아이디, 비밀번호를 확인해주세요.',
        '',
        'warning'
      )
      return;
    } else {
    }
    postLogin({
      userid,
      password,
    }).then((res) => {
      if (res == undefined) {
        navigate(`/login`);
      } else {
        navigate(`/`);
        setCookies("id", res.headers.authorization, {
          path: "/",
          maxAge: 240,
        });
      }
    });
  };

  return (
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
            onClick={(event) => {
              onSubmit(event);
            }}
          >
            로그인
          </StSignupBtn>
          <StSignupBtn
            onClick={() => {
              navigate(`/signup`);
            }}
          >
            회원가입
          </StSignupBtn>
        </StButtonBox>
        <StkakaoBtn id="login-kakao-btn" onClick={(event) => kakao(event)}>
          {" "}
          카카오로 로그인하기{" "}
        </StkakaoBtn>
      </StForm>
    </StcontainerBox>
  );
}

export default LoginForm;

const StcontainerBox = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 100px 100px 130px 100px;
  border: 2px solid var(--color3);
  border-radius: 10px;
`;
const StTitle = styled.div`
  font-size: 50px;
  margin: 30px 50px 20px 50px;
  padding: 50px 50px 20px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color3);
`;

const Stlabel = styled.label`
  margin: 15px 0 10px 0;
  color: var(--color3);
`;

const StInput = styled.input`
  margin: 10px 10px 10px 0px;
  padding: 5px 0px 5px 0px;
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

const StkakaoBtn = styled(Button)`
  margin: 20px 89px 20px 68px;
  padding: 10px 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
