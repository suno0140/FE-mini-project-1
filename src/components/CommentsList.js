import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getComments, __delComment } from "../redux/modules/commentsSlice";

import CommentModify from "./CommentModify";

function CommentsList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, comments } = useSelector((state) => (state.comments))
  useEffect(() => {
    dispatch(__getComments(id))
  }, [dispatch, id])

  if(isLoading){
    <div>Commets Loading ...</div>
  }

  return (
    <CommentBox>
      CommentsList
      {comments.map((v) => {
        return (
          <CommentModify
            key = {v.id}
            content = {v}
            >
          </CommentModify>
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