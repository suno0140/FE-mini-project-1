import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getcontents } from "../redux/modules/contentsSlice";

function PostList(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error , contents} = useSelector((state) => state.contents);
  useEffect(()=>{
    dispatch(__getcontents())
  },[dispatch])
  // console.log(contents)
  const toDetail = () =>{
    navigate("/")
  }

  return(
    <div>
      List
      <ListBox>
        {contents?.map((v)=>{
          return(
            <List key={v.id} onClick={()=>{toDetail()}}>
              <ConTitle>{v.title}</ConTitle>
              <ConAuthor>{v.nickname}</ConAuthor>
              <ConDate>{v.createdAt}</ConDate>
            </List>
          )
        })}
      </ListBox>
    </div>
  )
}

export default PostList;

const ListBox = styled.div`
  display: flex;
  width: 1200px;
  margin: auto;
  flex-direction: column;
  gap: 20px;
`

const List = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid var(--color1);
`

const ConTitle = styled.span`
  flex-grow: 1;
  font-size : large;
`;

const ConAuthor = styled.span`
  flex-grow: 1;
`;

const ConDate = styled.span`
  flex-grow: 1;
  text-align: center;
`;