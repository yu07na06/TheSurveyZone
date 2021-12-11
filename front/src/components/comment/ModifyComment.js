import React, { useState } from 'react';
import { commentModify as commentModifyAPI, commentSelect as commentSelectAPI } from  '../../lib/api/survey';
import IconButton from '@mui/material/IconButton';
import { Button, Container, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';

const ModifyComment = ({ data, _id, style, setCommentList, currentPage, setCountPage }) => {
    const [modiText, setModiText] = useState(data.com_Context);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const modiCom = (e) => {
        e.preventDefault();
        const modiCommentObj = { com_ID: data.com_ID,
                                 com_Password: e.target.com_Password.value,
                                 com_Context:modiText};
        handleClose();

        commentModifyAPI(_id, modiCommentObj)
            .then(()=> commentSelectAPI(_id, currentPage)
                        .then(res=>{setCommentList(res.data.commentlist); setCountPage(res.data.paginationInfo.totalPageCount);})
                        .catch(err=>{}))
            .catch(err=>err.response.status==401&&alert('비밀번호 틀렸습니다.'));
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <ModeEditOutlineTwoToneIcon />
            </IconButton>
            
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="xs"
            >
            <DialogTitle id="form-dialog-title">수정</DialogTitle>
            <DialogContent>
            <Container sx={{ py: 1 }} maxWidth="md">   
            
            <Grid container spacing={1} component="form" onSubmit={e=>modiCom(e)}>
            
            <Grid item xs = {12}>
                <TextField size='small' fullWidth id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
            </Grid>

            <Grid item xs = {12}>
                <TextField size='small' multiline rows={3} fullWidth onChange={e=>setModiText(e.target.value)} value={modiText} label="댓글" inputProps={{maxLength: 30}} required/><br/>
            </Grid>

            <Grid item xs = {6} align="center" >
                <Button type="submit">수정</Button>
            </Grid>
            
            <Grid item xs = {6} align="center" >
                <Button onClick={handleClose}>닫기</Button>
            </Grid>

            </Grid>
            </Container>
            </DialogContent>
            </Dialog>


        </>
    );
}

export default ModifyComment;