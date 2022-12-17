import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getContentsAll, setInitialError } from "../redux/modules/contentsSlice";
import Button from "./Button";

function PostList(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error , contents} = useSelector((state) => state.contents);
  useEffect(()=>{
    dispatch(setInitialError())
    dispatch(__getContentsAll())
  },[dispatch])
  const toDetail = (id) =>{
    navigate(`detail/${id}`)
  }

  return(
    <div>
      <SortBox>
        <SortBtn>최신순</SortBtn>
        <SortBtn>추천순</SortBtn>
      </SortBox>
      <ListBox>
        {contents?.map((v)=>{
          return(
            <List key={v.id} onClick={()=>{toDetail(v.id)}}>
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
  margin: 20px auto;
  flex-direction: column;
  gap: 20px;
`

const List = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid var(--color1);
  padding: 10px;
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

const SortBox = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SortBtn = styled(Button)`
  height: 30px;
  width: 100px;
  margin: 20px;
`
