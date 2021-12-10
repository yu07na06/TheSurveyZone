import React, { useState } from 'react';
import { commentModify as commentModifyAPI, commentSelect as commentSelectAPI } from  '../../lib/api/survey';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';

const ModifyComment = ({ data, _id, style, setCommentList }) => {
    const [modiText, setModiText] = useState(data.com_Context);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const modiCom = (e) => {
        e.preventDefault();
        // api 요청할 데이터 form 
        const modiCommentObj = { com_ID: data.com_ID,
                                 com_Password: e.target.com_Password.value,
                                 com_Context:modiText};
        handleClose();

        // 수정 API 요청
        commentModifyAPI(_id, modiCommentObj)
            .then(()=> commentSelectAPI(_id)
            // .then(res=>{console.log("성공!! : ",res.data)})
                        .then(res=>{setCommentList(res.data)})
                        .catch(err=>console.log("실패 : ",err)))
            .catch(err=>console.log("실패 : ",err));
        // 혹시 수정하고 api요청 안하고 닫기 눌렀을 경우를  대비해서 state 초기화
        setModiText(data.com_Context)
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <ModeEditOutlineTwoToneIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
            <Box component="form" onSubmit={e=>modiCom(e)} sx={style}>
                <TextField onChange={e=>setModiText(e.target.value)} value={modiText} label="댓글" inputProps={{maxLength: 30}} required/><br/>
                <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                <Button onClick={handleClose}>닫기</Button>
                <Button type="submit">수정</Button>
            </Box>

            </Modal>
        </>
    );
}

export default ModifyComment;