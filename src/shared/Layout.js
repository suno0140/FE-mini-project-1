import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import icon from "../img/TS_icon.svg"

function Header() {
  return (
    <HeadLine>
      <TestLink to="/"><IconImg src={icon}/></TestLink>
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

const IconImg = styled.img`
  align-content: center;
  background-size: cover;
  width: 200px;
`
const HeadBtn = styled.button`
  border: none;
  background-color: var(--color2);
  height: 50px;
  width: 100px;
  color: white;
  margin: 20px;
  &:hover{
    background-color: white;
    color: Black;
    border: 3px solid var(--color2);
  }
`