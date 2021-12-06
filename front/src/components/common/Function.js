import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Swal from 'sweetalert2';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

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
        Swal.fire('설문 URL이 복사되었습니다.');
    };
    // flag값이 icon이라면? icon을 반환!! 그외에는 입력된값을 클립보드에 저장!!
    return (flag === "icon" ? <Button><ContentCopyIcon onClick={() => doCopy(copyText)} /></Button> : doCopy(copyText));
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