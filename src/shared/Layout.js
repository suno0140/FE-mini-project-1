import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { ReactComponent as icon } from "../img/TS_icon_2.svg";
// import { getCookie } from "../components/LoginFrame/LoginForm";
import { getCookies } from "../api/cookieControler";
import { useCookies } from "react-cookie";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const token = getCookies("id");

  const logOut = () => {
    if (!window.confirm("로그아웃 하겠습니까??")) {
      return;
    } else {
      removeCookie("id", { path: "/" });
      navigate("/");
    }
  };

  let leftBtn, rightBtn;
  if (token) {
    leftBtn = <HeadBtn onClick={logOut}>로그아웃</HeadBtn>;
    rightBtn = (
      <HeadBtn onClick={() => navigate("posting")}>게시글작성</HeadBtn>
    );
  } else {
    leftBtn = <HeadBtn onClick={() => navigate("login")}>로그인</HeadBtn>;
    rightBtn = <HeadBtn onClick={() => navigate("signup")}>회원가입</HeadBtn>;
  }

  return (
    <HeadLine>
      <TestLink to="/">
        <IconImg />
      </TestLink>
      <BtnBox>
        {leftBtn}
        {rightBtn}
      </BtnBox>
    </HeadLine>
  );
}
function Footer() {
  return <div></div>;
}
function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
export default Layout;

const HeadLine = styled.div`
  /* background-color: var(--color1); */
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 2px 0px 0px var(--color2);
  overflow: hidden;
`;
const BtnBox = styled.div`
  background: none;
  display: flex;
`;

const TestLink = styled(Link)`
  background: none;
  color: var(--color2);
`;

const IconImg = styled(icon)`
  align-content: center;
  background-size: cover;
  width: 200px;
  & path {
    fill: var(--color3);
  }
`;
const HeadBtn = styled(Button)`
  height: 50px;
  width: 100px;
  margin: 20px;
`;
