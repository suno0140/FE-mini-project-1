import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";

import { axiosDB } from "../api/axiosAPI";

import axios from "axios";
import {DB} from "../api/axiosAPI"

function Home() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
// /api/members/kakao

  const kakaoLogin = async() =>{
    console.log(code)
    try{
      const data = await axios.get(`${DB}/api/members/kakao`,{
        headers: { "Authorization":  `Bearer ${code}` }
      })
      console.log(data)
      return data;
    } catch (error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if(code){
      kakaoLogin();
    }
  },[code])

  // const postLogin = async (post) => {
  //   try {
  //     const data = await axiosDB.post("/api/members/login", post);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <PostList />
    </div>
  )
}
export default Home;
