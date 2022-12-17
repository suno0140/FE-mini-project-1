import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __delContent, __getContent } from "../redux/modules/contentsSlice";

import styled from "styled-components";

function DetailInfo() {
  const [isClick, setClick] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams();
  const { isLoading, error, msg, content } = useSelector((state) => state.contents);

  useEffect(() => {
    dispatch(__getContent(id))
    if (error) {
      alert(error.message)
      navigate("../")
    }
  }, [dispatch])

  useEffect(() => {
    if (!isClick) return
    if (msg === "success" && isClick) {
      navigate("../")
    }
  }, [msg, isClick])

  const delHandler = async () => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      return
    } else {
      await dispatch(__delContent(id))
    }
  }

  return (
    <ContentBox>
      <ConTitle>{content.title}</ConTitle>
      <ConBody>{content.content}</ConBody>
      <ConMin>
        <div>{content.nickname}</div>
        <div>{content.createdAt}</div>
      </ConMin>
      <BtnBox>
        <ConBtn onClick={() => navigate(`../modify/${content.id}`)}>수정</ConBtn>
        <ConBtn onClick={delHandler}>삭제</ConBtn>
      </BtnBox>
    </ContentBox>
  )
}

export default DetailInfo;

const ContentBox = styled.div`
  border: 10px double var(--color2);
  width: 800px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
`

const ConTitle = styled.div`
  font-size: large;
  position: relative;
  border-left: 10px solid var(--color2);
  border-bottom: 2px solid var(--color2);
  padding: 10px;
  color: #000;
  padding: 10px;
  &:before{
    position: absolute;
    left: -10px;
    top: 0;
    content: '';
    width: 10px;
    height: 50%;
    background-color: var(--color1);
  }
  
`

const ConBody = styled.div`
  padding: 20px;
  white-space: pre-line;
  border-top: 5px double var(--color2);
  border-bottom: 5px double var(--color2);
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
`

const ConMin = styled.div`
  display: flex;
  justify-content: space-between;
`

const BtnBox = styled.div`
  background: none;
  display: flex;
  margin: auto;
`

const ConBtn = styled.button`
  border: none;
  background-color: var(--color2);
  height: 30px;
  width: 100px;
  color: white;
  margin: 20px;
  &:hover{
    background-color: white;
    color: Black;
    border: 3px solid var(--color2);
  }
`