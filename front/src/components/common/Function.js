import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getImgURL as getImgURLAPI } from '../../lib/api/survey';
import ErrorSweet from '../common/modules/ErrorSweet';

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
    return (flag === "icon" ? <Button><ContentCopyIcon onClick={() => doCopy(copyText)} /></Button> : doCopy(copyText));
}

export const Img = ({ setUrl, imageSRC, showBtn }) => {
    const [ selectedFile, setSelectedFile ] = useState(null);
  
    const handleFileChange = (e) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewImage = document.getElementById('img_box');
        previewImage.src = e.target.result;
      };
      
      if(e.target.files[0]==undefined || e.target.files[0]==null) 
        return;
      setSelectedFile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    };
    
    useEffect(() => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("img", selectedFile);
        
        getImgURLAPI(formData)
          .then(res => setUrl(res.data))
          .catch(err => ErrorSweet('error', err.response.status, err.response.statusText, err.response.data.message, null));
      }
    }, [selectedFile])
  
    return (
      <>
        {imageSRC
          ? <><img width="30%" height="auto" id="img_box" src={imageSRC} alt="" /><Gongback num={1} /></>
          : <><img width="30%" height="auto" id="img_box" src="" alt="" /><Gongback num={1} /></>
        }
  
        {showBtn&&<Input sx={{ ml: "auto" }} type="file" inputProps={{accept:"image/*"}} onChange={handleFileChange} />}
      </>
    );
}

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

export const MakeThemeProvider = ({ children }) => {
  const changeTheme = createTheme({ palette: { mode: 'light' } })
  return (
    <ThemeProvider theme={changeTheme}>
      {children}
    </ThemeProvider>
  );
}

export default ClipboardCopy