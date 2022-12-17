import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addContent } from "../redux/modules/contentsSlice";

import styled from "styled-components";

function PostForm() {
  const [isClick, setClick] = useState(false);
  const navigate = useNavigate();
  const { msg } = useSelector((state) => state.contents);
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    title: "",
    content: "",
  });
  const changeInput = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const onAddHandler = async (e) => {
    e.preventDefault();
    if (content.title.trim() === "" || content.content.trim() === "") {
      alert("공백을 채워주세요");
      return;
    }
    if (!window.confirm("추가 하겠습니까?")) {
      return;
    } else {
      await dispatch(__addContent({ ...content }));
      setClick(true);
    }
  };

  useEffect(() => {
    if (!isClick) return;
    if (msg === "success" && isClick) {
      navigate("/");
    }
    alert(msg);
  }, [msg, isClick]);

  return (
    <FormBox method="post" onSubmit={onAddHandler}>
      <InputTitle
        required
        type="text"
        name="content_title"
        value={content.content_title}
        maxLength="24"
        onChange={changeInput}
        placeholder="제목 입력"
      ></InputTitle>

      <InputBody
        required
        name="content_body"
        value={content.content_body}
        onChange={changeInput}
        placeholder="내용 입력"
      ></InputBody>

      <button onSubmit={onAddHandler}>확인</button>
    </FormBox>
  );
}

export default PostForm;

const FormBox = styled.form`
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  font-size: 24px;
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const FormInfo = styled.div`
  grid-area: info;
  text-align: center;
`;

const InputTitle = styled.input`
  border: none;
  padding: 10px;
  border-bottom: 2px solid var(--color2);
`;

const InputBody = styled.textarea`
  border: 2px solid var(--color2);
  height: 250px;
  padding: 10px;
`;
