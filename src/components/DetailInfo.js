import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __delContent, __getContent } from "../redux/modules/contentsSlice";

import styled from "styled-components";

function DetailInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams();
  const { isLoading, error, content } = useSelector((state) => state.contents);
  useEffect(() => {
    dispatch(__getContent(id))
  }, [dispatch])

  const delHandler = () =>{
    dispatch(__delContent(id))
  }

  return (
    <ContentBox>
      detailInfo
      <ConTitle>{content.title}</ConTitle>
      <ConBody>{content.content}</ConBody>
      <ConMin>
        <div>{content.nickname}</div>
        <div>{content.createdAt}</div>
      </ConMin>
      <BtnBox>
        <ConBtn>수정</ConBtn>
        <ConBtn onClick={delHandler}>삭제</ConBtn>
      </BtnBox>
    </ContentBox>
  )
}

export default DetailInfo;

const ContentBox = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
`

const ConTitle = styled.div`
  font-size: large;
  padding: 10px;
`

const ConBody = styled.div`
  padding: 20px;
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