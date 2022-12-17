import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getComments } from "../redux/modules/commentsSlice";

function CommentsList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, comments } = useSelector((state) => (state.comments))
  useEffect(() => {
    dispatch(__getComments(id))
  }, [dispatch, id])
  console.log(id, comments)
  return (
    <CommentBox>
      CommentsList
      {comments.map((v) => {
        return (
          <div key={v.id}>
            <CommentEl>
              <div>{v.content}</div>
              <div>{v.nickname}</div>
            </CommentEl>
            <CommentDate>{v.createdAt}</CommentDate>
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

const CommentEl = styled.div`
  border-bottom: 2px solid var(--color2);
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 5px 5px 0px 0px var(--color1);
`
const CommentDate = styled.div`
  display: flex;
  justify-content: flex-end;
`