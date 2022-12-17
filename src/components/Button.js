import React from "react"
import styled from "styled-components"

const StBtn = styled.button`
  border: none;
  background-color: var(--color2);
  color: white;
  &:hover{
    background-color: white;
    color: Black;
    border: 3px solid var(--color2);
  }
`

const Button = (props) => {
  return (
    <StBtn className = {props.className} onClick={props.onClick} onSubmit={props.onSubmit}>
      {props.children}
    </StBtn>
  )
}

export default Button;



