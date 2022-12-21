import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __delContent, __getContent } from "../redux/modules/contentsSlice";

import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentModify from "./CommentModify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { axiosDB } from "../api/axiosAPI";

import dayjs from "dayjs";
import Button from "./Button";
import axios from "axios";

function DetailInfo() {
  const [isClick, setClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, error, msg, content } = useSelector(
    (state) => state.contents
  );

  useEffect(() => {
    dispatch(__getContent(id));
    if (error) {
      alert(error.message);
      navigate("../");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isClick) return;
    if (msg === "success" && isClick) {
      navigate("../");
    }
  }, [msg, isClick]);

  const checkHandler = async (postid) => {
    try {
      const data = await axiosDB.get(`/api/posts/${postid}/membercheck`);
      if (data.data.statusCode === 200) navigate(`../modify/${postid}`);
      else if (data.data.statusCode === 400) alert(data.data.msg);
      else alert("Error");
    } catch (error) {
      alert(error.message);
    }
  };

  const checkGoodHandler = async (postid) => {
    try {
      const data = await axiosDB.post(`/api/posts/${postid}/recommend`);
      if (data.data.statusCode === 200) {
        dispatch(__getContent(id));
      }
    } catch (error) {
      alert("로그인정보를 확인해주세요.");
    }
  };

  const delHandler = async () => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      return;
    } else {
      await dispatch(__delContent(id));
      navigate("/");
    }
  };

  return (
    <div>
      <ContentBox>
        <ConTitle>{content.title}</ConTitle>
        <ConBody>{content.content}</ConBody>
        <ConMin>
          <div>작성자 / {content.nickname}</div>
          <div>{dayjs(content.createdAt).format("YYYY-MM-DD hh:mm:ss")}</div>
        </ConMin>
        <div>
          <GoodBtn onClick={() => checkGoodHandler(content.id)}>좋아요</GoodBtn>
          <FontAwesomeIcon icon={faHeart} />
          <Conspan>{content.recommendCount}</Conspan>
        </div>

        <BtnBox>
          <ConBtn onClick={() => checkHandler(content.id)}>수정</ConBtn>
          <ConBtn onClick={delHandler}>삭제</ConBtn>
        </BtnBox>
      </ContentBox>
      <CommentForm />
      <CommentBox>
        CommentsList
        {content?.commentList?.map((v) => {
          return <CommentModify key={v.id} content={v}></CommentModify>;
        })}
      </CommentBox>
    </div>
  );
}

export default DetailInfo;

const ContentBox = styled.div`
  border: 3px solid var(--color3);
  border-radius: 5px;
  width: 800px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  padding: 30px 40px 80px 30px;
  text-align: center;
`;

const ConTitle = styled.div`
  font-size: large;
  position: relative;
  /* border-left: 10px solid var(--color3); */
  /* border: 3px solid var(--color3); */
  padding: 10px;
  color: #000;
  padding: 10px;
  &:before {
    position: absolute;
    left: -10px;
    top: 0;
    content: "";
    width: 10px;
    height: 50%;
    /* background-color: var(--color3); */
  }
`;

const ConBody = styled.div`
  padding: 20px 0 50px;
  white-space: pre-line;
  border-top: 2px solid var(--color3);
  border-bottom: 2px double var(--color3);
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: left;
`;

const ConMin = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BtnBox = styled.div`
  background: none;
  display: flex;
  margin: auto;
`;

const ConBtn = styled.button`
  border: none;
  border-radius: 3px;
  background-color: var(--color3);
  height: 30px;
  width: 100px;
  color: white;
  margin: 20px;
  &:hover {
    background-color: white;
    color: Black;
    border: 3px solid var(--color3);
  }
`;

const CommentBox = styled.div`
  /* border: 4px solid var(--color3); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 800px;
  margin: 50px auto;
  padding: 20px;
  gap: 20px;
`;

const GoodBtn = styled(Button)`
  margin: 20px 10px 0 650px;
  padding: 10px 10px;
`;
const Conspan = styled.span`
  margin-left: 2px;
`;
