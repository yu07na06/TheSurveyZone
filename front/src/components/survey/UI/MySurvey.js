import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button, Grid, Pagination, Tab, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ClipboardCopy from '../../common/Function';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; // 진행전 아이콘
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // 진행중 아이콘
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'; // 마감 아이콘
import OTL from '../../common/UI/OTL';

const MySurvey = ({ mySurList, callPaging, ApiClick, currentPage, }) => {
    return (
        <>
            <Container component="main" maxWidth="md" sx={{ mb: 4 }} >
                <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {mySurList&&(mySurList.surveylist.length===0)
                        ? 
                            <OTL flag={"설문"}/>
                        : 
                            <>
                                <List>
                                    {mySurList&&mySurList.surveylist.map((value, index) =>
                                        <ListItem>
                                            <ListItemAvatar>
                                                {/* 진행전 */}
                                                { value.sur_State===0 && <RadioButtonUncheckedIcon style={{ color: "green"}} />}
                                                {/* 진행중 */}
                                                { value.sur_State===1 && <RadioButtonCheckedIcon style={{ color: "blue"}} />}
                                                {/* 마감 */}
                                                { value.sur_State===2 && <CheckCircleIcon style={{ color: "red"}} />}
                                            </ListItemAvatar>

                                            <Typography>{value.sur_State===0?"진행전":(value.sur_State===1?"진행중":"마감")}</Typography>

                                            <ListItemText>
                                                <Link to={`/ReadOnlyPage/${value._id}`} style={{textDecoration:'none', color:'gray'}}>
                                                    <Tab label={mySurList.paginationInfo.firstRecordIndex+index+1+". "+value.sur_Title} style={{fontWeight:'bold'}}/>
                                                </Link> 
                                            </ListItemText>

                                            {
                                                value.sur_State===0
                                                ? <Button id="mod" onClick={(e)=>ApiClick(e,value._id)}>수정</Button>
                                                : <Button id="result" onClick={(e)=>ApiClick(e,value._id)}>결과</Button>
                                            }

                                            <Button id="del" onClick={(e)=>ApiClick(e,value._id)}>삭제</Button>
                                            
                                            {ClipboardCopy("icon",`http://localhost:3000/SurveySubmitPage/${value._id}`)}
                                        </ListItem>
                                    )}
                                </List>
                                <Grid container justifyContent="center">
                                    {mySurList&&<Pagination showFirstButton showLastButton page={currentPage} onChange={(_, page)=>{ callPaging(page); }} count={mySurList.paginationInfo.totalPageCount} color="primary" />}
                                </Grid>
                            </>
                    }  
                </Paper>
            </Container>
        </>
    );
};

export default MySurvey;