import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button, Grid, Pagination, Tab, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ClipboardCopy, { Gongback } from '../../common/Function';

const MySurvey = ({mySurList,callPaging, ApiClick}) => {
        return (
            <>
                {mySurList&&(mySurList.surveylist.length===0)
                ?
                    <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                            <br/><br/><br/><br/>
                            <div style={{textAlign: "center"}}>
                                <Typography variant="h3" color="blue">내용뭐라쓸지 고민중 (설문이없다ㅠ)MySurvey.js 22번줄</Typography>
                                <img src="https://ifh.cc/g/e3Txxg.jpg" alt="이미지 업로드 실패..ㅠ"/>
                            </div>
                            <Gongback />
                    </Container>
                :
                    <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                        <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <List>
                                {mySurList&&mySurList.surveylist.map((value) =>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <Link to={`/SurveySubmitPage/${value._id}`} style={{textDecoration:'none', color:'gray'}}><Tab label={value.sur_Title} style={{fontWeight:'bold'}}/></Link> 
                                        </ListItemText>
                                        {value.sur_State===0?<Button id="mod" onClick={(e)=>ApiClick(e,value._id)}>수정</Button>:<Button id="result" onClick={(e)=>ApiClick(e,value._id)}>결과</Button>}
                                        <Button id="del" onClick={(e)=>ApiClick(e,value._id)}>삭제</Button>
                                        {ClipboardCopy("icon",`http://localhost:3000/SurveySubmitPage/${value._id}`)}
                                    </ListItem>
                                )}
                            </List>
                            
                            <Grid item marginLeft="33%" xs={12}>
                                <div style={{textAlign: "center"}}>
                                    {mySurList&&<Pagination onChange={(e)=>callPaging((e.target.ariaLabel).split(' ')[3])} count={mySurList.paginationInfo.lastPage} color="primary" />}
                                </div>
                            </Grid>
                        </Paper>
                    </Container>}
            </>
    );
};

export default MySurvey;