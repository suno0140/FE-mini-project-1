import React from "react";
import CommentForm from "../components/CommentForm";
import CommentsList from "../components/CommentsList";
import DetailInfo from "../components/DetailInfo";
function Detail() {
  return (
    <div>
      <DetailInfo />
      <CommentForm />
      <CommentsList />
    </div>
  );
}
export default Detail;
