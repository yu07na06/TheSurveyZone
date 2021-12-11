import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { commentDelete as commentDeleteAPI, commentSelect as commentSelectAPI } from '../../lib/api/survey';

const DelComment = ({ _id, data, style, setCommentList, currentPage, setCountPage, setCurrentPage, }) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const delCom = (e) => {
        e.preventDefault();
        
        const com_Password = document.querySelector('#com_Password');
        const delCommentObj = {com_ID: data.com_ID,
                               com_Password: e.target.com_Password.value};
                               
        commentDeleteAPI(_id, delCommentObj)
            .then(()=> commentSelectAPI(_id,currentPage)
                        .then(res=>{setCommentList(res.data.commentlist); setCountPage(res.data.paginationInfo.totalPageCount); setCurrentPage(res.data.paginationInfo.criteria.page_Num)})
            .catch(err=> err.response.status==401&&alert('비밀번호 틀렸습니다.')))
        com_Password.value = '';
        handleClose();
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <CloseIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" onSubmit={e=>delCom(e)} sx={style}>
                    <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                    <Button onClick={handleClose}>닫기</Button>
                    <Button type="submit">삭제</Button>
                </Box>
            </Modal>
        </>
    );
}

export default DelComment;