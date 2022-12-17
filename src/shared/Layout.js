import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import {ReactComponent as icon } from "../img/TS_icon.svg"

function Header() {
  return (
    <HeadLine>
      <TestLink to="/"><IconImg /></TestLink>
      <BtnBox>
        <HeadBtn to="login">Login</HeadBtn>
        <HeadBtn to="signup">Signup</HeadBtn>
      </BtnBox>
    </HeadLine>
  )
}
function Footer() {
  return (
    <div>
    </div>
  )
}
function Layout({children}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default Layout;


const HeadLine = styled.div`
  /* background-color: var(--color1); */
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 0px 0px var(--color2);

`
const BtnBox = styled.div`
  background: none;
  display: flex;
`

const TestLink = styled(Link)`
  background: none;
  color:var(--color2);
`

const IconImg = styled(icon)`
  align-content: center;
  background-size: cover;
  width: 200px;
  & path{
    fill: var(--color1);
  }
`
const HeadBtn = styled(Button)`
  height: 50px;
  width: 100px;
  margin: 20px;
`