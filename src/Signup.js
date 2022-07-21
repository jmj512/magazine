import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const Signup = (props) => {
  let navigate = useNavigate();

  const id = React.useRef(null);
  const name = React.useRef(null);
  const pw = React.useRef(null);
  const pw_check = React.useRef(null);

  const signupFB = async () => {
    // console.log(id.current.value, name.current.value, pw.current.value, pw_check.current.value);

    if (pw.current.value !== pw_check.current.value ) {
      window.alert("비밀번호와 비밀번호 확인이 같지 않습니다. 다시 입력해주세요.")
      return;
    } 

    if (name.current.value === "") {
      window.alert("닉네임을 입력하세요.")
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        id.current.value, 
        pw.current.value
      );

      const user_doc = await setDoc(doc(db, "users", id.current.value), {
        user_id: user.user.email, 
        name : name.current?.value
      });                          // firestore 가면 입력한 대로 저장됨.
      // console.log(user_doc.id);   // db 안의 id 출력
      // setDoc에는 난수 말고 이름 지정 가능. email 넣을거야!
      // setDoc 데이터 설정 - 문서 있는지 확인하고 있으면 추가, 없으면 x.
      // addDoc 데이터 추가 - 새로운 문서 만들어줆

      navigate("/login");     // 버튼을 onClick하면 signupFB 함수 안에서 navigate 실행될 수 있다!
  
      window.alert(`환영합니다. ${name.current.value}님, 로그인 해주세요~!`);
      // 회원가입 하는 순간 자동 로그인 됨. 그래서 없어도 되는 기능.
      
    } catch (err) {
      switch (err.message) {
        case ("Firebase: Error (auth/invalid-email).") :
          alert("아이디(이메일)을 이메일 형식으로 입력해주세요.");
          break
        case ("Firebase: Password should be at least 6 characters (auth/weak-password).") :
          alert("비밀번호를 6자리 이상 입력해주세요.");
          break      
        default:
          break
      }

      // console.log(err.message);
    }
  };

  return (
    <>
      <Box>
        <h1 style={{ color: "#0f6344" }}>회원가입</h1>
        <Label>아이디 (이메일)</Label>
        <In type="text" ref={id} />
        <Label>닉네임</Label>
        <In type="text" ref={name} />
        <Label>비밀번호</Label>
        <In type="password" ref={pw} />
        <Label>비밀번호 확인</Label>
        <In type="password" ref={pw_check} />
        <Button variant="contained"
          onClick={signupFB}
          style={{
            background: "#008b02",            
            fontSize: "15px",
            margin: "40px auto",
            display: "block"         
          }}
        >
          회원가입
        </Button>
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 30%;
  height: 570px;
  border: 2px solid #009688;
  border-radius: 10px;
  margin: 30px auto 0px auto;
  padding: 30px;
`;

const Label = styled.h4`
  color: #4caf50;
  margin-top: 10px;
`;

const In = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 30vw;
  height: 40px;
  font-size: 16px;
`;

export default Signup;
