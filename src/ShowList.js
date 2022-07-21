import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import { AddCircle } from "@material-ui/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ShowList = (props) => {
  let navigate = useNavigate();

  console.log("텍스트의 props입니다.", props.send);

  return (
    <Container>
      <Show>
        <div>
          <AccountCircleIcon
            style={{ color: "cornflowerblue" }}
          ></AccountCircleIcon>
        </div>
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
      </Show>

      {/* // { ~ ? () : ~~~ ?  () : -- } */}
      {props.send.layout === "first" ? (
        <div
          onClick={() => {
            navigate("/detail");
            // navigate("/detail"+index);     // 설정해야 함! 그러면 주소창에 /1 이렇게 인덱스 붙음!
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            marginTop: "60px"
          }}
        >
          <div
            style={{
              border: "1px solid gray",
              width: "20vw",
              height: "30vh",
            }}
          >
            {props.send.writing}
          </div>
          <img
            src={props.send.image_url}
            alt="sample"
            style={{
              border: "1px solid gray",
              borderLeft: "none",
              width: "20vw",
              height: "30vh",
            }}
          />
        </div>
      ) : props.send.layout === "second" ? (
        <div
          onClick={() => {
            navigate("/detail");
            // navigate("/detail"+index);     // 설정해야 함! 그러면 주소창에 /1 이렇게 인덱스 붙음!
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            marginTop: "60px"
          }}
        >
          <img
            src={props.send.image_url}
            alt="sample"
            style={{
              border: "1px solid gray",
              borderRight: "none",
              width: "20vw",
              height: "30vh",
            }}
          />
          <div
            style={{
              border: "1px solid gray",
              width: "20vw",
              height: "30vh",
            }}
          >
            {props.send.writing}
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            navigate("/detail");
            // navigate("/detail"+index);     // 설정해야 함! 그러면 주소창에 /1 이렇게 인덱스 붙음!
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              border: "1px solid gray",
              width: "20vw",
              height: "100px",
            }}
          >
            {props.send.writing}
          </div>
          <img
            src={props.send.image_url}
            alt="sample"
            style={{
              border: "1px solid gray",
              borderTop: "none",
              width: "20vw",
              height: "30vh",
            }}
          />
        </div>
      )}

      <AddCircle
        onClick={() => {
          navigate("/write");
        }}
        color="primary"
        aria-label="add"
        style={{
          fontSize: "70px",
          marginLeft: "1200px",
          position: "fixed",
          right: "50px",
          bottom: "50px",
        }}
      />
    </Container>
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

export default ShowList;
