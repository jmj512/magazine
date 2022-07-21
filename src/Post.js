import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShowList from "./ShowList";

const Post = (props) => {
  // console.log(props);       // {post: Array(4)} 라고 콘솔에 뜸.

  const data = useSelector((state) => state.magazine.list);
  // console.log(data);

  return (
    <>
      {data.map((v, idx) => {
        return (
        <ShowList 
        key={idx} 
        send={v} />);
      })}
    </>
  );
};

export default Post;
