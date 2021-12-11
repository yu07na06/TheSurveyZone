import React, { useState } from 'react';
import { commentDelete as commentDeleteAPI, commentSelect as commentSelectAPI } from '../../lib/api/survey';
import IconButton from '@mui/material/IconButton';
import { Button, Container, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DelComment = ({ _id, data, style, setCommentList, currentPage, setCountPage, setCurrentPage }) => {
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
                        .then(res=>{ setCommentList(res.data.commentlist); setCountPage(res.data.paginationInfo.totalPageCount); setCurrentPage(res.data.paginationInfo.criteria.page_Num)}))
            .catch(err=> { err.response.status==401&&alert('비밀번호 틀렸습니다.')})
        com_Password.value = '';
        handleClose();
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <CloseIcon />
            </IconButton>

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="xs"
            >
            <DialogTitle id="form-dialog-title">삭제</DialogTitle>
            <DialogContent>
            <Container sx={{ py: 1 }} maxWidth="md">   
            
            <Grid container spacing={1} component="form" onSubmit={e=>delCom(e)}>
            
            <Grid item xs = {12}>
                <TextField size='small' fullWidth id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
            </Grid>

            <Grid item xs = {6} align="center" >
                <Button type="submit">삭제</Button>
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

export default DelComment;