import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getDocs, where, query, collection } from "firebase/firestore";
import { createUser } from "./redux/modules/magazine";

const Login = (props) => {
  let navigate = useNavigate();
  
  const dispatch = useDispatch();

  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const loginFB = async () => {
    // console.log(id_ref.current.value, pw_ref.current.value);    // input값 입력하는 대로 console에 찍힘.
    
    if ( id_ref.current.value === "" || pw_ref.current.value === "" ) {
      window.alert("아이디 또는 패스워드가 올바르지 않습니다.");
    } else {
      const user = await signInWithEmailAndPassword(
        auth,
        id_ref.current.value,
        pw_ref.current.value
      );
      // sign은 auth에 정보 넣고, 저기에서 정보 갖다 넣으면 됨.
  
      // console.log(user);
      console.log(auth.currentUser.email);
      // firebase 안에 auth 있어서 어느 컴포넌트에서나 다 import 가능!

      navigate("/");

      window.alert("로그인 되었습니다!");

      // const user_docs = await getDocs(
      //   query(collection(db, "users"), 
      //   where("user_id", "==", user.user.email))
      //   );
      //   console.log(user_docs);        
      //   // user_docs.forEach((u) => {
      //   // console.log(u.data());
      //   // })
        
      //   const [data] = user_docs.docs.map(doc => ({
      //   ...doc.data()
      //   }));
      //   console.log(data);
        
      //   dispatch(createUser(data));  // 리덕스로 보낸다!
    }    
  };  

  return (
    <>
      <Box>
        <h1 style={{ color: "#0f6344" }}>로그인</h1>
        <Label>아이디(이메일)</Label>
        <In ref={id_ref} />
        <Label>비밀번호</Label>
        <In ref={pw_ref} type="password" />
        <Button
          variant="contained"
          disabled={ id_ref.length === 0 || pw_ref.length === 0 }
          onClick={loginFB}
          style={{
            background: "#008b02",
            margin: "40px auto",
            display: "block",
            fontSize: "15px"
          }}
        >
          로그인하기
        </Button>
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 30%;
  height: 450px;
  border: 2px solid #009688;
  border-radius: 10px;
  margin: 30px auto 0px auto;
  padding: 30px;
`;

const Label = styled.h4`
  color: #4caf50;
  margin-top: 50px;
`;

const In = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 30vw;
  height: 40px;
  font-size: 16px;
`;

export default Login;
