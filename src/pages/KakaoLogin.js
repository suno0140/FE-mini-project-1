import React from "react";
import { useParams } from "react-router-dom";


function KakaoLogin(){
  const {id} = useParams();
  console.log(id)

  return(
    <div>
      login 중입니다.
    </div>
  )
}

export default KakaoLogin;