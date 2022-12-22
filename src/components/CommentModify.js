import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __delComment,
  __patchComment,
  __getComments,
} from "../redux/modules/commentsSlice";

import Button from "./Button";
import styled from "styled-components";
import { __getContent } from "../redux/modules/contentsSlice";

// /api/posts/{postid}/membercheck

import { axiosDB } from "../api/axiosAPI";

import { dateCalc } from "./dateCalc";


import { useCallback } from "react";
import Swal from "sweetalert2";

function CommentModify(props){
  const {id} = useParams();

  const list = props.content;
  const dispatch = useDispatch();
  const [comment, setComment] = useState(list.content);
  const [isEdit, setIsEdit] = useState(false);

  // const textarea = useRef();

  // const handleResize = (obj) =>{
  //   console.log(obj.style.height)
  //   obj.style.height = "auto";
  //   obj.style.height = obj.style.scrollHeight + 'px';
  // }

  const textRef = useRef();
  const handleResize = useCallback(() => {
    textRef.current.style.height = "auto"
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);


  const checkHandler = async(commentsid) =>{
    try{
      const data = await axiosDB.get(`/api/posts/comments/${commentsid}/membercheck`);
      if(data.data.statusCode === 200) setIsEdit(true)
      else if(data.data.statusCode=== 400) alert(data.data.msg)
      else {
        Swal.fire(
          '로그인 정보를 확인해주세요',
          '',
          'error'
        )    
      }
    }catch(error){
      Swal.fire(
        '로그인 정보를 확인해주세요',
        '',
        'error'
      )    

    }
  };

  const delHandler = async (comment_id) => {
    Swal.fire({
      title: "삭제 하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제'
    }).then(async (result) => {
      if (result.isConfirmed) {
          await dispatch(__delComment(comment_id));
          dispatch(__getContent(id))
      }
    })
  }


  const onModifyHandler = async(e) =>{
    e.preventDefault()
    if (comment.trim() === "") {
      Swal.fire(
        '공백을 체워주세요',
        '',
        'warning'
      )
      return
    }
    Swal.fire({
      title: "수정 하시겠습니까?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const commentId = list.id
        const content = {content : comment}
        await dispatch(__patchComment({content, commentId}));
        dispatch(__getContent(id))
        setIsEdit(false)
      }
    })
  }
  
  return(
    <div>
      <CommentEl>
        <InputTitle
          ref={textRef}
          required
          type="text"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            handleResize();
          }}
          readOnly={isEdit ? "" : "readonly"}
        ></InputTitle>
        <div>
          {isEdit ? (
            <CommentBtn
              color="var(--color1)"
              onClick={(event) => {
                onModifyHandler(event);
              }}
            >
              수정
            </CommentBtn>
          ) : (
            <CommentBtn
              color="var(--color2)"
              onClick={() => {
                checkHandler(list.id);
              }}
            >
              수정
            </CommentBtn>
          )}

          {isEdit ? (
            <CommentBtn
              color="var(--color1)"
              onClick={async () => {
                await setComment(list.content);
                await setIsEdit(false);
                handleResize()
              }}
            >
              최소
            </CommentBtn>
          ) : (
            <CommentBtn
              color="var(--color2)"
              onClick={() => delHandler(list.id)}
            >
              삭제
            </CommentBtn>
          )}
        </div>
      </CommentEl>
      <CommentBot>
        <CommentWirter>작성자 / {list.nickname}</CommentWirter>
        <CommentTime>{dateCalc(list.createdAt)}</CommentTime>
      </CommentBot>
    </div>
  );
}


export default CommentModify;

const InputTitle = styled.textarea`
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: medium;
  flex: 1;
  min-height: 25px;
  max-height: 100px;
  resize: none;
`;

const CommentBtn = styled(Button)`
  height: 30px;
  width: 50px;
  margin-left: 10px;
`;

const CommentEl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CommentBot = styled.div`
  display: flex;
  padding-left: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentWirter = styled.div`
  margin: 10px;
`;

const CommentTime = styled.div`
  margin: 10px 0 0 0px;
`;
