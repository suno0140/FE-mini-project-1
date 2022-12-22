import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  __getContentsAll,
  __getGoodContents,
  setInitialError,
  __searchContent,
} from "../redux/modules/contentsSlice";
import Button from "./Button";
import { dateCalc } from "./dateCalc";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function PostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, contents } = useSelector((state) => state.contents);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    dispatch(setInitialError());
    dispatch(__getContentsAll());
  }, [dispatch]);
  const toDetail = (id) => {
    navigate(`detail/${id}`);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() === "") {
      dispatch(__getContentsAll());
      return;
    }
    dispatch(__searchContent(keyword));
  };

  // const onGoodContentsHandler = () => {
  //   dispatch(__getGoodContents());
  // };

  return (
    <div>
      <HomeHead>
        <form
          onSubmit={(event) => {
            searchHandler(event);
          }}
        >
          <InputKeyword
            type="text"
            placeholder="검색"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          ></InputKeyword>
          <SortBtn>검색</SortBtn>
        </form>
      </HomeHead>
      <SortBox>
        <SortBtn
          onClick={() => {
            dispatch(__getContentsAll());
          }}
        >
          최신순
        </SortBtn>
        <SortBtn
          onClick={() => {
            dispatch(__getGoodContents());
          }}
        >
          추천순
        </SortBtn>
      </SortBox>
      <ListBox>
        {contents?.map((v) => {
          return (
            <List
              key={v.id}
              onClick={() => {
                toDetail(v.id);
              }}
            >
              <ConTitle>{v.title}</ConTitle>
              <ConBody>{v.content}</ConBody>
              <ConAuthor>작성자 / {v.nickname}</ConAuthor>
              <ConHeart>
                <FontAwesomeIcon icon={faHeart} />
                {v.recommendCount}
              </ConHeart>
              <ConDate>{dateCalc(v.createdAt)}</ConDate>
            </List>
          );
        })}
      </ListBox>
    </div>
  );
}

export default PostList;

const ListBox = styled.div`
  display: flex;
  width: 1000px;
  margin: 20px auto;
  flex-direction: column;
  gap: 50px;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid var(--color3);
  margin-top: 20px;
  padding: 30px;
  height: 45px;
  background-color: white;
  gap: 10px;
`;

const ConTitle = styled.span`
  flex: 2;
  font-size: large;
`;

const ConBody = styled.span`
  flex: 3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConAuthor = styled.span`
  flex: 1;
`;

const ConDate = styled.span`
  flex: 1;
  text-align: right;
`;

const ConHeart = styled.span`
  width: 50px;
  display: flex;
  justify-content: space-between;
`;

const SortBox = styled.div`
  display: flex;
  justify-content: center;
`;

const SortBtn = styled(Button)`
  height: 30px;
  width: 100px;
  margin: 20px;
`;
const HomeHead = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0 0 130px;
`;

const InputKeyword = styled.input`
  border: 1px solid var(--color3);
  border-radius: 5px;
  margin-top: 30px;
  padding: 10px;
  width: 550px;
  /* border-bottom: 2px solid var(--color2); */
`;
