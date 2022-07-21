import React from "react";
import styled from "styled-components";
import { Home } from "@material-ui/icons";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Route, Routes } from "react-router-dom";
import Post from "./Post";
import Signup from "./Signup";
import Write from "./Write";
import Detail from "./Detail";
import Login from "./Login";
import { auth, db } from "./shared/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { loadMagaFB } from "./redux/modules/magazine";
import {useDispatch} from "react-redux";

function App() {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [list, setList] = React.useState(["이름", "시간", "텍스트", "사진"]);
  // console.log(list);  

  const [is_login, setIsLogin] = React.useState(false);
  // console.log(auth.currentUser);    // console에 유저 정보 객체로 뜸. -> 로그인된 상태다!

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);   // 유저가 있으면 true로 바꾸고, 아니면 계속 초기값 false로.
    } else {
      setIsLogin(false);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      setIsLogin(false);
    });    
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);     // auth 값(앞의 인자)이 바뀌면 작동한다.
    dispatch(loadMagaFB());
  }, []);

  return (
    <div className="App">
      <Title>
        <Home
          onClick={() => {
            navigate("/");
          }}
          style={{
            fontSize: "35",
          }}
        />
        Magazine
        <div>
          { is_login ? (
            <LogoutIcon
            onClick={logout}
            style={{
              color: "white",
              background: "#009688",
              width: "60px",
              height: "33px",
              fontSize: "25",
              borderRadius: "3px",
            }}
          >
          </LogoutIcon>
          ) : (               
            <>
            <Button
            onClick={() => {
              navigate("/signup");
            }}
            style={{
              color: "white",
              background: "#009688",
              marginRight: "15px",
            }}
          >
            회원가입
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            style={{
              color: "white",
              background: "#009688",
            }}
          >
            로그인
          </Button>
          </>
          ) }                    
        </div>
      </Title>
      <Routes>
        <Route path="/" element={<Post />} />    
        {/* post={list}를 <Post /> 안에 넣어줌 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail/" element={<Detail />} />
        {/* <Route path="/detail/:index" element={<Detail />} /> */}
      </Routes>
    </div>
  );
}

const Title = styled.h1`
  color: #009688;
  width: 100%;
  min-width: 250px;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // space-between = 사이 공간 최대한 벌림
  // space-evenly = 모든 item 사이 간격 똑같이
  // space-around = 양쪽 끝에만 간격 줌
  align-items: center;
  margin: auto; // auto 20px <- 상하 + 좌우
`;

export default App;
