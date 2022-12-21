import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getContentsAll, setInitialError, __searchContent } from "../redux/modules/contentsSlice";
import Button from "./Button";


import { dateCalc } from "./dateCalc";

function PostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, contents } = useSelector((state) => state.contents);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    dispatch(setInitialError())
    dispatch(__getContentsAll())
  }, [dispatch])
  const toDetail = (id) => {
    navigate(`detail/${id}`)
  }

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() === "") {
      dispatch(__getContentsAll())
      return;
    }
    dispatch(__searchContent(keyword))
  }

  return (
    <div>
      <HomeHead>
        <form onSubmit={(event) => { searchHandler(event) }}>
          <InputKeyword
            type="text"
            placeholder="검색"
            value={keyword}
            onChange={(event) => { setKeyword(event.target.value) }}>
          </InputKeyword>
          <SortBtn>검색</SortBtn>
        </form>
        <SortBox>
          <SortBtn>최신순</SortBtn>
          <SortBtn>추천순</SortBtn>
        </SortBox>
      </HomeHead>



      <ListBox>
        {contents?.map((v) => {
          return (
            <List key={v.id} onClick={() => { toDetail(v.id) }}>
              <ConTitle>{v.title}</ConTitle>
              <ConBody>{v.content}</ConBody>
              <ConAuthor>{v.nickname}</ConAuthor>
              <ConDate>{dateCalc(v.createdAt)}</ConDate>
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
  height: 20px;
`


const ConTitle = styled.span`
  flex: 2;
  font-size : large;
`;

const ConBody = styled.span`
  flex: 3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ConAuthor = styled.span`
  flex: 1;
`;

const ConDate = styled.span`
  flex: 1;
  text-align: right;
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
const HomeHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const InputKeyword = styled.input`
  border: none;
  padding: 10px;
  width: 300px;
  border-bottom: 2px solid var(--color2);
`;