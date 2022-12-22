import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PostList from "../components/main/PostList";
import axios from "axios";
import { DB } from "../api/axiosAPI";

import { setCookies } from "../api/cookieControler";

function Home() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const kakaoLogin = async () => {
    try {
      const data = await axios.get(`${DB}/api/members/kakao?code=${code}`);
      setCookies("id", data.headers.authorization, {
        path: "/",
        maxAge: 1750,
      });
      navigate("/");
      return data;
    } catch (error) {
    }
  };

  useEffect(() => {
    if (code) {
      kakaoLogin();
    }
  }, [code]);

  return (
    <div>
      <PostList />
    </div>
  );
}
export default Home;
