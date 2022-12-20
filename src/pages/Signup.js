import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { __addSignup } from "../redux/modules/signupSlice";
import { useCallback } from "react";
import { axiosDB } from "../api/axiosAPI";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userid, setUserid] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [useridMessage, setUseridMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isUserid, setIsUserid] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isUseridCheck, setIsUseridCheck] = useState(false);
  const [isNickNameCheck, setIsNickNameCheck] = useState(false);

  const useridRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const onChangeUserId = useCallback((e) => {
    const useridCurrent = e.target.value;
    setUserid(useridCurrent);

    if (!useridRegex.test(useridCurrent)) {
      setUseridMessage("올바른 이메일 형식이 아닙니다");
      setIsUserid(false);
    } else {
      setUseridMessage("올바른 이메일 형식입니다.");
      setIsUserid(true);
    }
  }, []);

  const onChangeNickName = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value < 2 || e.target.value > 8) {
      setNickNameMessage(`문자가 포함되어야 합니다.`);
      setIsNickName(false);
    } else {
      setNickNameMessage(`올바른 닉네임 형식입니다.`);
      setIsNickName(true);
    }
  });

  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  }, []);

  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호가 일치합니다.");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요!");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  const idCheck = async (post) => {
    try {
      const data = await axiosDB.post(`api/members/check`, post);
      if (data.data.statusCode === 200) {
        alert("사용 가능한 아이디 입니다.");
        setIsUseridCheck(true);
      } else {
        alert("중복된 아이디 입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onIdCheck = (e) => {
    e.preventDefault();
    if (userid.length === 0) {
      alert("아이디를 입력해주세요.");
      return;
    } else if (!useridRegex.test(userid)) {
      alert("올바른 이메일형식이 아닙니다.");
      return;
    }
    idCheck({
      userid,
    });
  };

  const nickCheck = async (post) => {
    try {
      console.log(post);
      const data = await axiosDB.post(`api/members/check`, post);
      if (data.data.statusCode === 200) {
        alert("사용 가능한 닉네임 입니다.");
        setIsNickNameCheck(true);
      } else {
        alert("중복된 닉네임 입니다.");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onNickCheck = (e) => {
    e.preventDefault();
    if (nickname.length === 0) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    nickCheck({ userid: "", nickname });
  };

  const onClickLogin = () => {
    navigate(`/login`);
  };

  const onClickSignup = () => {
    dispatch(__addSignup({ userid, nickname, password }));
    alert("회원가입에 성공하셨습니다.");
    navigate(`/login`);
  };

  return (
    <>
      <StcontainerBox>
        <StForm>
          <StTitle>회원가입</StTitle>
          <Stlabel>아이디</Stlabel>
          <Stdiv>
            <StInput
              placeholder=" 이메일형식으로 작성해주세요"
              onChange={onChangeUserId}
              type="email"
              disabled={isUseridCheck}
            ></StInput>
            <StConfirmBtn
              type="button"
              onClick={(event) => {
                onIdCheck(event);
              }}
            >
              중복체크
            </StConfirmBtn>
          </Stdiv>

          {userid.length > 0 && (
            <span
              style={{ color: isUserid ? "blue" : "red" }}
              className={`message ${isUserid ? "success" : "error"}`}
            >
              {useridMessage}
            </span>
          )}

          <Stlabel>닉네임</Stlabel>
          <Stdiv>
            <StInput
              placeholder=" 닉네임을 입력해주세요"
              disabled={isNickNameCheck}
              onChange={onChangeNickName}
              type="text"
            ></StInput>
            <StConfirmBtn
              type="button"
              onClick={(event) => {
                onNickCheck(event);
              }}
            >
              중복체크
            </StConfirmBtn>
          </Stdiv>
          {nickname.length > 1 && (
            <span
              style={{ color: isNickName ? "blue" : "red" }}
              className={`message ${isNickName ? "success" : "error"}`}
            >
              {nickNameMessage}
            </span>
          )}
          <Stlabel>비밀번호</Stlabel>
          <StInput
            placeholder=" 비밀번호를 입력해주세요"
            type="password"
            onChange={onChangePassword}
          ></StInput>
          {password.length > 0 && (
            <span
              style={{ color: isPassword ? "blue" : "red" }}
              className={`message ${isPassword ? "success" : "error"}`}
            >
              {passwordMessage}
            </span>
          )}
          <Stlabel>비밀번호확인</Stlabel>
          <StInput
            placeholder=" 비밀번호를 입력해주세요"
            type="password"
            onChange={onChangePasswordConfirm}
          ></StInput>
          {passwordConfirm.length > 0 && (
            <span
              style={{ color: isPasswordConfirm ? "blue" : "red" }}
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </span>
          )}
          <br />
          <StButtonBox>
            <StSignupBtn
              onClick={() => {
                onClickLogin();
              }}
            >
              뒤로가기
            </StSignupBtn>
            <StSignupBtn
              type="submit"
              disabled={
                !(
                  isNickName &&
                  isPassword &&
                  isUserid &&
                  isPasswordConfirm &&
                  isUseridCheck &&
                  isNickNameCheck
                )
              }
              onClick={onClickSignup}
            >
              회원가입
            </StSignupBtn>
          </StButtonBox>
        </StForm>
      </StcontainerBox>
    </>
  );
}

export default Signup;
const StcontainerBox = styled.div`
  margin: 50px 10px 30px 30px;
  width: 90%;
  min-width: 800px;
  padding: 30px 30px 30px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 400px;
`;
const Stdiv = styled.div`
  display: flex;
  width: 400px;
`;
const StTitle = styled.div`
  font-size: 50px;
  margin: 0px 50px 0px 50px;
  padding: 50px 50px 30px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color2);
`;
const Stlabel = styled.label`
  margin: 25px 10px 10px 0;
  color: var(--color2);
`;

const StInput = styled.input`
  margin: 10px 10px 10px 0px;
  padding: 5px 0px 5px 0px;
  width: 100%;
`;
const StSignupBtn = styled(Button)`
  height: 40px;
  width: 90px;
  margin: 5px 0 0 10px;
`;
const StButtonBox = styled.div`
  margin: 0 auto;
`;
const StConfirmBtn = styled(Button)`
  width: 100px;
  height: 30px;
  margin: 11px;
`;
