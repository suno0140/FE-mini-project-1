import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __delContent, __getContent } from "../../redux/modules/contentsSlice";

import styled, { keyframes } from "styled-components";
import CommentForm from "../comment/CommentForm";
import CommentModify from "../comment/CommentModify";
import { BsFillHeartFill } from "react-icons/bs";

import { axiosDB } from "../../api/axiosAPI";

import dayjs from "dayjs";
import Button from "../feature/Button";

import Swal from "sweetalert2";

function DetailInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, content } = useSelector((state) => state.contents);

  useEffect(() => {
    dispatch(__getContent(id));
    if (content === undefined) navigate("/");
  }, [dispatch, content, id, navigate]);

  const checkHandler = async (postid) => {
    try {
      const data = await axiosDB.get(`/api/posts/${postid}/membercheck`);
      if (data.data.statusCode === 200) navigate(`../modify/${postid}`);
      else if (data.data.statusCode === 400) Swal.fire("로그인 정보를 학인 해주세요", "", "error");
      else {
        Swal.fire("로그인 정보를 학인 해주세요", "", "error");
      }
    } catch (error) {
      Swal.fire("로그인 정보를 학인 해주세요", "", "error");
    }
  };

  const delHandler = () => {
    Swal.fire({
      title: "삭제 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(__delContent(id));
        dispatch(__getContent(id));
      }
    });
  };

  const checkGoodHandler = async (postid) => {
    try {
      const data = await axiosDB.post(`/api/posts/${postid}/recommend`);
      if (data.data.statusCode === 200) {
        dispatch(__getContent(id));
      }
    } catch (error) {
      Swal.fire("로그인 정보를 학인 해주세요", "", "error");
    }
  };

  return (
    <div>
      <ContentBox>
        <ConTitle>{content?.title}</ConTitle>
        <ConBody>{content?.content}</ConBody>
        <ConMin>
          <div>작성자 / {content.nickname}</div>
          <div>{dayjs(content.createdAt).format("YYYY-MM-DD hh:mm:ss")}</div>
        </ConMin>
        <div>
          <Stbutton onClick={() => checkGoodHandler(content.id)}>
            <Heart size="25"></Heart>
          </Stbutton>
          <Conspan>{content.recommendCount}</Conspan>
        </div>

        <BtnBox>
          <ConBtn onClick={() => checkHandler(content?.id)}>수정</ConBtn>
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
  border-bottom: 2px solid var(--color3);
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: left;
  word-break: break-all;
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
  font-size: 25px;
`;
const Stbutton = styled.button`
  background-color: transparent;
  border: none;
  &:hover {
    background-color: transparent;
    color: Black;
  }
`;

const rotate = keyframes`
  10% { -webkit-transform: rotate(-10deg); };
  20% { -webkit-transform: rotate(8deg); };
  30% { -webkit-transform: rotate(-5deg); };
  40% { -webkit-transform: rotate(4deg); };
  50% { -webkit-transform: rotate(-3deg); };
  60% { -webkit-transform: rotate(2deg); };
  70% { -webkit-transform: rotate(-1deg); };
  80% { -webkit-transform: rotate(1deg); };
  90% { -webkit-transform: rotate(-1deg); };
  100% { -webkit-transform: rotate(0deg); };
`;

const Heart = styled.div`
  width:20px;
  height:20px;
  background: #ea2027;
  position: relative;
  transform: rotate(45deg);
  &:before, &:after{
    content: "";
    width:20px;
    height:20px;
    position: absolute;
    border-radius: 50%;
    background: #ea2027;
  }
  &:before{
    left: -50%;
  }
  &:after{
    left: 0%;
    top: -50%;
  }
  &:active{
    animation: ${rotate} 1s linear
  }
`

