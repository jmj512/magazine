import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Detail = (props) => {
  let navigate = useNavigate();
  const params = useParams();

//   console.log(index);
  // const magazine_index = params.index;
  // const magazine_list = useSelector((state) => state.magazine.list);

  // console.log(magazine_list);
  // console.log(magazine_index);
  // console.log(magazine_list[magazine_index]);

  return (
    <>
      {/* <h1>{magazine_list[magazine_index]}</h1> */}
      <Container>
      <Show>
        <div>
          <AccountCircleIcon
            style={{ color: "cornflowerblue" }}
          ></AccountCircleIcon>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          onClick={() => {
            navigate("/detail");
          }}
          style={{
            color: "white",
            background: "#009688",
            marginRight: "15px",
            display: "flex",
          }}
        >
          수정
        </Button>
        <Button
        style={{
          color: "white",
          background: "#009688"
        }}
      >
        {" "}
        삭제
      </Button>
      </div>
      </Show>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            border: "1px solid gray",
            width: "20vw",
            height: "30vh",
          }}
        >
          {/* {props.send.writing} */}
        </div>
        <img
        //   src={props.send.image_url}
          src="img/empty.png"
          alt="sample"
          style={{
            border: "1px solid gray",
            borderLeft: "none",
            width: "20vw",
            height: "30vh",
          }}
        />
      </div>      
      </Container>
    </>
    
  );
};


const Container = styled.div`
  width: 41%;
  height: 450px;
  border: 2px solid #009688;
  border-radius: 10px;
  margin: 30px auto 0px auto;
  padding: 30px;
`;

const Show = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;


export default Detail;
