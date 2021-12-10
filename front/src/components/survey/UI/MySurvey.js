import { Button, Grid, Pagination, Paper, Tab, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { Link } from 'react-router-dom';
import ClipboardCopy from '../../common/Function';
import OTL from '../../common/modules/OTL';
import MyCalendar from '../comp/MySurveyCalendar';
import QrCodeUrl from './QrCodeUrl';
import SendEmail from './SendEmail';
import Tooltip from '@mui/material/Tooltip';

const MySurvey = ({ mySurList, currentPage, callPaging, ApiClick, surStateMark, }) => {
    // console.log('렌더링!!');
    return (
        <>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={5.5}>
                        <Paper elevation={3} sx={{ my: { xs: 2, md: 3 }}}>
                            <Container sx={{ py: 2}}>
                                <MyCalendar
                                    data = {mySurList}                      
                                />
                            </Container>
                        </Paper>
                    </Grid>

                    <Grid item  xs={12} md={12} lg={6.5} >
                        <Paper elevation={3} sx={{ my: { xs: 2, md: 3 }}} style={{height: "650px"}} >
                            <Container sx={{ py: 2}}>
                                <Typography variant="h5" marginLeft="5px" style = {{fontWeight:'bold', color:"#2E2E2E"}}>
                                    설문 목록
                                </Typography>

                                {mySurList && (mySurList.surveylist.length === 0)
                                ? <OTL flag={"설문"} />
                                :
                                    <>
                                        <List style={{height: 535, overflow: 'auto'}}>
                                            {mySurList && mySurList.surveylist.map((value, index) =>
                                                <ListItem  >
                                                    <Paper elevation={1} style={{ boxShadow: "0px 5px 6px -6px", width: "100%" }}>
                                                        <Grid container alignItems="center">
                                                            <Grid item align='center' xs={2} sm={1} md={1} lg={1}>
                                                                {surStateMark(value.sur_State)}
                                                            </Grid>
                                                            
                                                            <Grid item xs={12} md={11} lg={11}>
                                                                <Link to={`/ReadOnlyPage/${value._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                                    <Tab sx={{ minWidth: "10px" }} label={mySurList.paginationInfo.firstRecordIndex + index + 1 + ". " + value.sur_Title} style={{ fontWeight: 'bold' }} />
                                                                </Link>
                                                            </Grid>

                                                            <Grid item xs={2} md={2} lg={2} justifyContent="center" textAlign="center">
                                                                <Button id="read" onClick={(e) => ApiClick(e, value._id)} style={{ boxShadow : "0px 5px 6px -6px",  border:"1px solid #F2F2F2",fontWeight:'bold', borderRadius: '10px',  backgroundColor: "#FAFAFA" , color: 'Gray' , height:"30px"}}>
                                                                    보기
                                                                </Button>
                                                            </Grid>
                                                        
                                                            <Grid item xs={2} md={2} lg={2} justifyContent="center" textAlign="center">
                                                                {value.sur_State === 0
                                                                ? 
                                                                    <Button id="mod" onClick={(e) => ApiClick(e, value._id)} style={{ boxShadow : "0px 5px 6px -6px",  border:"1px solid #F2F2F2",fontWeight:'bold', borderRadius: '10px',  backgroundColor: "#FAFAFA" , color: 'Gray' , height:"30px"}}>
                                                                        수정
                                                                    </Button>
                                                                : 
                                                                    <Button id="result" onClick={(e) => ApiClick(e, value._id)} style={{ boxShadow : "0px 5px 6px -6px",  border:"1px solid #F2F2F2",fontWeight:'bold', borderRadius: '10px',  backgroundColor: "#FAFAFA" , color: 'Gray', height:"30px"}}>
                                                                        결과
                                                                    </Button>
                                                                }
                                                            </Grid>

                                                            <Grid item xs={2} md={2} lg={2} justifyContent="center" textAlign="center">
                                                                <Button id="del" onClick={(e) => {ApiClick(e, value._id)}} style={{ margin:"5px", boxShadow : "0px 5px 6px -6px",  border:"1px solid #F2F2F2",fontWeight:'bold', borderRadius: '10px',  backgroundColor: "#FAFAFA" , color: 'Gray', height:"30px"}}>
                                                                {/* <Button id="del" onClick={(e) => ApiClick(e, value._id)} style={{ margin:"5px", boxShadow : "0px 5px 6px -6px",  border:"1px solid #F2F2F2",fontWeight:'bold', borderRadius: '10px',  backgroundColor: "#FAFAFA" , color: 'Gray', height:"30px"}}> */}
                                                                    삭제
                                                                </Button>
                                                            </Grid>
                                                                
                                                            <Grid item xs={2} md={2} lg={2} justifyContent="center" textAlign="center">
                                                                <SendEmail _id={value._id} />
                                                            </Grid>
                                                                
                                                            <Grid item xs={2} md={2} lg={2} justifyContent="center" textAlign="center">
                                                                <QrCodeUrl id={value._id} />
                                                            </Grid>

                                                            <Grid item xs={2} md={2} lg={2} justifyContent="center" textAlign="center">
                                                                <Tooltip title="url 복사">
                                                                    {ClipboardCopy("icon", process.env.REACT_APP_URL+value._id)}
                                                                </Tooltip>
                                                            </Grid>

                                                        </Grid>
                                                    </Paper>
                                                </ListItem>
                                            )}
                                        </List>

                                        <Container>
                                            <Grid container justifyContent="center">
                                                {mySurList && <Pagination  count={5} shape="rounded" showFirstButton showLastButton page={currentPage} onChange={(_, page) => { callPaging(page); }} count={mySurList.paginationInfo.totalPageCount}  />}
                                            </Grid>
                                        </Container>
                                    </>
                                }
                            </Container >
                        </Paper>
                    </Grid>
                </Grid>
            </Container >
        </>
    );
};

export default MySurvey;
// export default React.memo(MySurvey);