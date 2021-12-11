import React, { useState } from 'react';
import { commentInsert as commentInsertAPI, commentSelect as commentSelectAPI} from '../../lib/api/survey';
import Tooltip from '@mui/material/Tooltip';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Button, Grid, TextField, Typography, Paper, Pagination, Dialog, DialogTitle, DialogContent, Container, List, ListItem, Menu, MenuItem, DialogActions } from '@mui/material';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(1);

    const callPaging = (page_Num) => {
        commentSelectAPI(_id,page_Num)
        .then(res=>{setCommentList(res.data.commentlist)})
        setCurrentPage(page_Num)
      }

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
        commentSelectAPI(_id,currentPage)
        .then(res=>{ setCommentList(res.data.commentlist); setCountPage(res.data.paginationInfo.totalPageCount)})
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

        commentInsertAPI(_id,commentObj)
        .then(()=>{init();commentSelectAPI(_id,currentPage)
            .then(res=>{ setCountPage(res.data.paginationInfo.totalPageCount); setCommentList(res.data.commentlist);})});
    }

    return(
        <>
            <Tooltip title="댓글">
                <IconButton onClick={handleClick} size="small">
                    <CommentIcon color="action" />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">설문 댓글</DialogTitle>
                
                <DialogContent>
                <Container sx={{ py: 0 }}>   
                    <List style={{height: 535, overflow: 'auto'}}>
                            {commentList.map((v, i)=>{
                                return(
                                <ListItem>  
                                <Paper elevation={1} style={{ boxShadow: "0px 5px 6px -6px", width: "100%" }} >
                                    <Grid container spacing={1}>
                                    <Grid item xs={10}  sm={10} md={10} lg={10} container>
                                    <Grid item xs={12}  sm={12} md={3} lg={3}>
                                        <Typography variant="body1">{v.com_Nickname}</Typography>
                                    </Grid>
                                    <Grid item xs={12}  sm={12} md={9} lg={9}>
                                        <Typography variant="body2">{v.com_Date}</Typography>
                                    </Grid>
                                    </Grid>
                                    <Grid align='center' item xs={2}  sm={2} md={2} lg={2}>
                                        <ModifyComment _id={_id} data={v} style={style} setCommentList={setCommentList} currentPage={currentPage} setCountPage={setCountPage} />
                                        <DelComment _id={_id} data={v} style={style} setCommentList={setCommentList} currentPage={currentPage} setCountPage={setCountPage} setCurrentPage={setCurrentPage}/>
                                    </Grid>
                                    <Grid item xs={12}  sm={12} md={12} lg={12}>
                                        <Typography style={{wordWrap:"break-word"}} variant="body2">{v.com_Context}</Typography>
                                    </Grid>
                                    
                                    </Grid>
                                </Paper >
                                </ListItem>  
                                )}
                            )}
                    </List>
                        
                    <Container sx={{ py: 1 }}>
                    <Grid container justifyContent="center">
                        <Pagination shape="rounded" showFirstButton showLastButton page={currentPage} onChange={(_,page) => { callPaging(page) }} count={countPage} />
                    </Grid>
                    </Container>

                    <Container sx={{ py: 1 }} component="form" onSubmit={e=>addCom(e)}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3} container spacing={1}>
                        
                        <Grid item xs={6} sm={12}>  
                        <TextField id='com_Nickname' fullWidth size='small' label="닉네임" inputProps={{maxLength: 8}} required autoComplete="off"/>
                        </Grid>

                        <Grid item xs={6} sm={12}>
                        <TextField id='com_Password' fullWidth size='small' type='password' label="비밀번호" inputProps={{maxLength: 8}} required autoComplete="off"/><br/>
                        </Grid>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                        <TextField id='com_Context' multiline rows={3} size='small' fullWidth label="입력란" inputProps={{maxLength: 30}} required autoComplete="off"/>
                        </Grid>

                        <Grid item xs={12} align="right">
                            <Button type="submit">댓글달기</Button>
                        </Grid>
                    </Grid>
                    </Container>
                  
                    </Container>   
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Comment;