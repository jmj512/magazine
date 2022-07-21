import React from "react";
import styled from "styled-components";
import {
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "./shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { createMagazine } from "./redux/modules/magazine";

const Write = (props) => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  // 레이아웃 버튼
  const [layoutButton, layoutChange] = React.useState("first");

  // 업로드 - 파일
  const [uploadImg, setUploadImg] = React.useState();

  // 미리보기 - 글, 이미지
  const [inputVal, inputChangeVal] = React.useState("");

  const temp_img =
    "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg";
  const [image, setImage] = React.useState(temp_img);

  // 미리보기 되는 기능
  const saveImage = (event) => {
    setUploadImg(event.target.files[0]);

    setImage(URL.createObjectURL(event.target.files[0]));
  };
  // onChange 되면 업로드-파일이 업로드명으로 저장되니까 이거랑 미리보기-url 따로 저장 필요.

  // 작성하기 버튼
  const writeFB = async (e) => {
    // dispatch(
    //   createMagazine({
    //     user_id: "야야양야야",
    //     nick: "이이이이이이",
    //     date: "ㅂㅈㄷㄱㅂㅈㄷㄱㅂㅈㄷㄱ",
    //     text: "000000",
    //     img: "~~~~~~~~~~~",
    //   })
    // );

    // console.log(file_link_ref);      // {current: {...}} 눌러보면 current: {url: ~~} 찍힘
    // return ;

    // console.log(e.target.files);  // FileList {0: File, length: 1} 찍힘. filelist 열어보면 file 들이 있음.

    const uploaded_file = await uploadBytes(
      ref(storage, `images/${uploadImg.name}`), // 어디에 저장할 거냐
      uploadImg // 어떤 파일 올릴 거냐
    );

    // console.log(uploaded_file);

    const file_url = await getDownloadURL(uploaded_file.ref);

    // console.log(file_url);      // 올린 파일의 url 갖고 오는 것임. (http://~~)
    // file_link_ref.current = { url: file_url };

    const user_doc = await addDoc(collection(db, "posts"), {
      writing: inputVal,
      image_url: file_url, // 옵셔널 체이닝: 뒤의 값이 없을 때 오류 안 나고 undefined로 들어가도록 함.
      layout: layoutButton,
      // date: date,
    });

    navigate("/");
  };

  return (
    <>
      <Post>
        <h1 style={{ color: "#0f6344" }}>게시글 작성</h1>
        <input
          name="imggeUpload"
          type="file"
          accept="image/*"
          onChange={saveImage}
        />
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "25px",
            }}
          >
            * 레이아웃 고르기
          </FormLabel>{" "}
          <br />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="first"
            name="radio-buttons-group"
          >            
            <FormControlLabel
              onChange={(e) => {
                layoutChange(e.target.value);
              }}
              value="first"
              control={
                <Radio />
              }
              label="왼쪽에 텍스트, 오른쪽에 이미지"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid gray",
                  borderRight: "none",
                  width: "20vw",
                  height: "30vh",
                }}
              >
                {inputVal}
              </div>
              <div>
                {image && (
                  <img
                    src={image}
                    alt="sample"
                    style={{
                      margin: "auto",
                      border: "1px solid gray",
                      width: "20vw",
                      height: "30vh",
                    }}
                  />
                )}
              </div>
            </div>

            <FormControlLabel
              onChange={(e) => {
                layoutChange(e.target.value);
              }}
              value="second"
              control={<Radio 
              />}
              label="왼쪽에 이미지, 오른쪽에 텍스트"
              />              
              
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
              }}
            >
              <div>
                {image && (
                  <img
                    src={image}
                    alt="sample"
                    style={{
                      margin: "auto",
                      border: "1px solid gray",
                      borderRight: "none",
                      width: "20vw",
                      height: "30vh",
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  border: "1px solid gray",
                  width: "20vw",
                  height: "30vh",
                }}
              >
                {inputVal}
              </div>
            </div>
            <FormControlLabel
              onChange={(e) => {
                layoutChange(e.target.value);
              }}
              value="third"
              control={<Radio />}
              label="위쪽에 텍스트, 아래쪽에 이미지"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid gray",
                  borderBottom: "none",
                  width: "20vw",
                  height: "100px",
                }}
              >
                {inputVal}
              </div>
              <div>
                {image && (
                  <img
                    src={image}
                    alt="sample"
                    style={{
                      margin: "auto",
                      border: "1px solid gray",
                      width: "20vw",
                      height: "30vh",
                    }}
                  />
                )}
              </div>
            </div>
          </RadioGroup>
        </FormControl>
        <In
          placeholder="내용을 입력하세요."
          onChange={(e) => {
            inputChangeVal(e.target.value);
          }}
        />
        <Button
          variant="contained"
          disabled={inputVal.length === 0 || image === temp_img}
          onClick={writeFB}
          style={{
            background: "#009688",
            marginTop: "40px",
            marginLeft: "43%",
            fontSize: "15px",
          }}
        >
          작성하기
        </Button>
      </Post>
    </>
  );
};

const Post = styled.div`
  width: 41%;
  height: 160vh;
  border: 2px solid #009688;
  border-radius: 10px;
  margin: 30px auto 0px auto;
  padding: 30px;
`;

const In = styled.input`
  width: 100%;
  height: 60px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 17px;
  text-align: top;
`;

export default Write;
