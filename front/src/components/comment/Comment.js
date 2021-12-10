import React, { useEffect, useState } from 'react';
import { commentInsert as commentInsertAPI, commentSelect as commentSelectAPI} from '../../lib/api/survey';
import Tooltip from '@mui/material/Tooltip';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { Button, Grid, TextField, Typography, Paper } from '@mui/material';
import ModifyComment from './ModifyComment';
import DelComment from './DelComment';

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
    const open = Boolean(anchorEl);

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
        // 댓글 조회 API 요청
        commentSelectAPI(_id)
        // .then(res=>{console.log("성공!! : ",res.data)})
        .then(res=>{setCommentList(res.data)})
        .catch(err=>console.log("실패 : ",err));
    } 
    const handleClose = () => setAnchorEl(null);
    
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

        // 댓글 등록 API요청
        commentInsertAPI(_id,commentObj)
        .then(()=>{init();commentSelectAPI(_id) // 성공하면 댓글 목록 다시 요청
             .then(res=>{setCommentList(res.data)})
             .catch(err=>console.log("실패 : ",err))})
        .catch(err=>console.log("실패 : ",err));
    }

    // useEffect(()=>{
    //     console.log('변경된거 확인 했음ㅎ', commentList);
        
    // },[commentList])

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
                                    {/* {console.log("무슨값 ?  : ",v)} */}
                                    <Grid item xs={9}>
                                        <Typography>{`[${v.com_Nickname}] : ${v.com_Context} - ${v.com_Date}`}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ModifyComment _id={_id} data={v} style={style} setCommentList={setCommentList}/>
                                        <DelComment _id={_id} data={v} style={style} setCommentList={setCommentList}/>
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
                </Box>
            </Modal>
        </>
    );
}

export default Comment;