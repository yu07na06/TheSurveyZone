import CommentIcon from '@mui/icons-material/Comment';
import { Button, Grid, Pagination, Paper, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { commentInsert as commentInsertAPI, commentSelect as commentSelectAPI } from '../../lib/api/survey';
import DelComment from './DelComment';
import ModifyComment from './ModifyComment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Comment = ({_id}) => {
    const [ commentList, setCommentList ] = useState([]);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(1);
    const open = Boolean(anchorEl);
    
    const handleClose = () => setAnchorEl(null);

    const callPaging = (page_Num) => {
        commentSelectAPI(_id,page_Num)
            .then(res=>{setCommentList(res.data.commentlist)});
        setCurrentPage(page_Num)
      }

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);

        commentSelectAPI(_id,currentPage)
            .then(res=>{ setCommentList(res.data.commentlist); setCountPage(res.data.paginationInfo.totalPageCount)});
    } 
    
    const addCom = (e) => {
        e.preventDefault();
        const commentObj = {com_Nickname:e.target.com_Nickname.value,
                            com_Password:e.target.com_Password.value,
                            com_Context:e.target.com_Context.value };

        const com_Nickname = document.querySelector('#com_Nickname');
        const com_Password = document.querySelector('#com_Password');
        const com_Context = document.querySelector('#com_Context');

        const init=()=>{
            com_Nickname.value = '';
            com_Password.value = '';
            com_Context.value = '';
        }

        commentInsertAPI(_id,commentObj)
        .then(()=>{ init(); 
            commentSelectAPI(_id,currentPage)
                .then(res=>{ setCountPage(res.data.paginationInfo.totalPageCount); setCommentList(res.data.commentlist);})
            }
        );
    }

    return(
        <>
            <Tooltip title="댓글">
                <IconButton onClick={handleClick} size="small">
                    <CommentIcon color="action" />
                </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper sx={{ height: 400, width: 400 }} >
                        <Grid container spacing={2}>
                            {commentList.map((v, i)=>{
                                return(
                                <>
                                    <Grid item xs={9}>
                                        <Typography>{`[${v.com_Nickname}] : ${v.com_Context} - ${v.com_Date}`}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ModifyComment _id={_id} data={v} style={style} setCommentList={setCommentList} currentPage={currentPage} setCountPage={setCountPage} />
                                        <DelComment _id={_id} data={v} style={style} setCommentList={setCommentList} currentPage={currentPage} setCountPage={setCountPage} setCurrentPage={setCurrentPage}/>
                                    </Grid>
                                </>)}
                            )}
                        </Grid>
                    </Paper>

                    <Box component="form" onSubmit={e=>addCom(e)}>
                        <TextField id='com_Nickname' label="닉네임" inputProps={{maxLength: 8}} required autoComplete="off"/>
                        <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required autoComplete="off"/><br/>
                        <TextField id='com_Context' fullWidth label="입력란" inputProps={{maxLength: 30}} required autoComplete="off"/>
                        <Button type="submit">댓글달기</Button>
                    </Box>
                    
                    <Button onClick={handleClose}>닫기</Button>

                    <Grid container justifyContent="center">
                        <Pagination shape="rounded" showFirstButton showLastButton page={currentPage} onChange={(_,page) => { callPaging(page) }} count={countPage} />
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}

export default Comment;