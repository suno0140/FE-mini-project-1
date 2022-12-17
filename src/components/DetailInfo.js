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
    console.log("error" , error)
    if(error){
      alert(error.message)
      navigate("../")
    }
  }, [dispatch])

  useEffect(()=>{
    if(!isClick) return
    if(msg === "success" && isClick){
      navigate("../")
    }
  },[msg, isClick])

  const delHandler = async() =>{
    if(!window.confirm("삭제 하시겠습니까?")){
      return
    } else{
      await dispatch(__delContent(id))
      setClick(true)
    }
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
        <ConBtn onClick={()=>navigate(`../modify/${content.id}`)}>수정</ConBtn>
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
  white-space: pre-line;
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