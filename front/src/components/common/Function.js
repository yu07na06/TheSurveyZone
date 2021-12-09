import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from 'sweetalert2';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@mui/material';
import ErrorSweet from '../common/modules/ErrorSweet';

// 함수의 매개변수로 들어온 값을 클립보드에 저장해주는 함수입니다.
const ClipboardCopy = (flag, copyText) => { 
    const doCopy = text => {
        if (!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.position = "fixed";
        document
            .body
            .appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document
            .body
            .removeChild(textarea);
        ErrorSweet('info', null, "복사 성공", "참여 설문 URL 복사", 'url창에 붙여넣기 해보세요.');
    };
    // flag값이 icon이라면? icon을 반환!! 그외에는 입력된값을 클립보드에 저장!!
    return (flag === "icon" ? <Button><ContentCopyIcon onClick={() => doCopy(copyText)} /></Button> : doCopy(copyText));
}

// 파일 이미지 업로드 함수
export const Img = ({ setUrl, imageSRC, showBtn }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [, setFileURL] = useState(null);
  
    // onChange역할 
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
  
      // 업로드한 이미지 미리보기
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewImage = document.getElementById('img_box');
        previewImage.src = e.target.result;
      };
  
      reader.readAsDataURL(e.target.files[0]);
  
      console.log("reader", reader);
      setFileURL(reader.result)
  
      // handleFileUpload(e);
    };
  
    // formData라는 instance에 담아 보냄
  
    useEffect(() => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("img", selectedFile);
        console.log("selectedFile", selectedFile);
  
        axios.post(`/api/v1/image`, formData)
          .then(res => { setUrl(res.data) })
          .catch(err => { console.log(err); });
        console.log("업로드도 되었지롱");
      }
    }, [selectedFile])
  
    return (
      <>
        {imageSRC
          ? <><img width="100%" height="auto" id="img_box" src={imageSRC} alt="" /><Gongback num={1} /></>
          : <><img width="100%" height="auto" id="img_box" src="" alt="" /><Gongback num={1} /></>
        }
  
        {showBtn&&<Input sx={{ ml: "auto" }} type="file" inputProps={{accept:"image/*"}} onChange={handleFileChange} />}
      </>
    );
}

// 공백을 만들기 위한 함수
export const Gongback = ({ num }) => {
    let nbsp = [];

    for (var i = 0; i < num; i++) {
        nbsp.push(i)
    }

    return (
        <>
            {nbsp.map(v => <br />)}
        </>
    )
}

// 다크모드 아직 확정 아님
export const MakeThemeProvider = ({ children }) => {
    const changeTheme = createTheme({ palette: { mode: 'light' } })
    // const changeTheme = createTheme()
    return (
        <ThemeProvider theme={changeTheme}>
            {children}
        </ThemeProvider>
    );
}

export default ClipboardCopy