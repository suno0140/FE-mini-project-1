import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


function Header() {
  return (
    <HeadLine>
      <TestLink to="/"> Trouble Shooter</TestLink>
      <BtnBox>
        <TestLink to="login">Login</TestLink>
        <TestLink to="signup">Signup</TestLink>
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
  background-color: var(--color1);
  height: 50px;
  display: flex;
  justify-content: space-between;
`
const BtnBox = styled.div`
  background: none;
  display: flex;
  gap: 20px;
`

const TestLink = styled(Link)`
  background: none;
  color:var(--color2);
`
