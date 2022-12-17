import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getComments, __delComment } from "../redux/modules/commentsSlice";

import Button from "./Button";


function CommentsList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, comments } = useSelector((state) => (state.comments))
  useEffect(() => {
    dispatch(__getComments(id))
  }, [dispatch, id])

  const delHandler = async (comment_id) => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      return
    } else {
      await dispatch(__delComment(comment_id))
    }
  }


  return (
    <CommentBox>
      CommentsList
      {comments.map((v) => {
        return (
          <div key={v.id}>
            <CommentEl>
              <div>{v.content}</div>
              <div>
                <CommentBtn>수정</CommentBtn>
                <CommentBtn onClick={()=>delHandler(v.id)}>삭제</CommentBtn>
              </div>
            </CommentEl>
            <CommentBot>
              <div>{v.nickname}</div>
              <div>{v.createdAt}</div>
            </CommentBot>
          </div>
        )
      })}
    </CommentBox>
  )
}

export default CommentsList;

const CommentBox = styled.div`
  border: 4px solid var(--color2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 800px;
  margin: 50px auto;
  padding: 20px;
  gap: 20px;
`


const CommentBtn = styled(Button)`
  height: 30px;
  width: 50px;
  margin-left: 10px;
`

const CommentEl = styled.div`
  border-bottom: 2px solid var(--color2);
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const CommentBot = styled.div`
  display: flex;
  padding-left:5px;
  flex-direction: row;
  justify-content: space-between;
`
