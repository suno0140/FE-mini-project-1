import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __delComment , __patchComment, __getComments} from "../redux/modules/commentsSlice";

import Button from "./Button";
import styled from "styled-components";

function CommentModify(props){
  const list = props.content;
  const dispatch = useDispatch();
  const {id} = useParams();
  const [comment, setComment] = useState(list.content);
  const [isEdit, setIsEdit] = useState(false)
  const delHandler = async (comment_id) => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      return
    } else {
      await dispatch(__delComment(comment_id))
    }
  }
  const onModifyHandler = async(e) =>{
    e.preventDefault()
    if (comment.trim() === "") {
      alert("공백을 채워주세요")
      return
    }
    if(!window.confirm("수정 하겠습니까?")){
      return
    } else {
      const commentId = list.id
      const content = {content : comment}
      await dispatch(__patchComment({content, commentId}));
      setIsEdit(false)
      dispatch(__getComments(id));
    }
  }
  return(
    <div>
    <CommentEl>
    <InputTitle
          required
          type="text"
          value = {comment}
          onChange = {(event)=>setComment(event.target.value)}
          readOnly = {isEdit? "" : "readonly" } 
        ></InputTitle>
      <div>
        { isEdit? 
          <CommentBtn 
          color = "var(--color1)"
          onClick={(event)=> {onModifyHandler(event)}}
          >수정</CommentBtn> 
          :
          <CommentBtn
          color = "var(--color2)"
          onClick={()=> {setIsEdit(true)}}
          >수정</CommentBtn>
        }
        
        {isEdit?
          <CommentBtn 
          color = "var(--color1)"
          onClick={async() => {await setComment(list.content); await setIsEdit(false);}}
          >최소</CommentBtn>
          :
          <CommentBtn 
          color = "var(--color2)"
          onClick={()=>delHandler(props.id)}
          >삭제</CommentBtn>
        }
      </div>
    </CommentEl>
    <CommentBot>
      <div>{list.nickname}</div>
      <div>{list.createdAt}</div>
    </CommentBot>
  </div>
  )
}




export default CommentModify;

const InputTitle = styled.input`
  border : none;
  padding: 10px;
  /* border-bottom: 2px solid var(--color2); */
  font-size: medium;
  flex: 1;
`;

const CommentBtn = styled(Button)`
  height: 30px;
  width: 50px;
  margin-left: 10px;
  background-color: ${(props)=> props.color} ;
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