import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chart from 'react-google-charts';
// import BarChart from 'rechart';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

const Main = ({ data, accUserData, accAgeData, accSexData, reqMain, callPage, TAGENUM, }) => {
    return (
        <>
            {/* 태그 출력 */}
            <Box sx={{ bgcolor: 'background.paper', pt: 2 }}>
                <Container maxWidth="sm">
                    <Stack
                        direction="row"
                        justifyContent="center"
                    >
                    { data.sur_Tag && data.sur_Tag.map((value) => 
                        <Button id={`${value.tag_ID}`}>#{value.tag_Name}</Button>
                    )}
                    </Stack>
                </Container>
            </Box>

            
            <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {/* 누적 이용자 */}
                    <Grid item xs={4}>
                        <Chart
                            width={'450px'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={accUserData}
                            options={{
                                title: '11월 누적 이용자 수',
                                titleFontSize: "18",
                                captionFontSize: "20px",
                                chartArea: { width: '90%', height: '70%' },
                            }}
                            />
                    </Grid>

                    {/* 누적 이용자 연령 비율 */}
                    <Grid item xs={4}>
                        <Chart
                            width={'400px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={accAgeData}
                            options={{
                                title: '누적 이용자 연령 비율',
                                titleFontSize: "18",
                                pieHole: 0.5,
                                chartArea: { width: '80%', height: '70%' },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </Grid>

                    {/* 누적 이용자 성별 비율 */}
                    <Grid item xs={4}>
                        <Chart
                            width={'400px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={accSexData}
                            options={{
                                title: '누적 이용자 성별 비율',
                                titleFontSize: "18",
                                pieHole: 0.5,
                                chartArea: { width: '80%', height: '70%' },
                            }}
                            />
                    </Grid>


                    {/* 설문 리스트 출력 */}
                    {reqMain && reqMain.surveylist.map((value) => (
                        <Grid item key={value._id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {value.sur_Title}
                                    </Typography>
                                    <Typography>
                                        {value.sur_Content}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    {/* 설문 참여 링크 이동 */}
                                    {value.sur_State === 1?<Link to={`/SurveySubmitPage/${value._id}`} style={{textDecoration:'none', color:'blue', fontWeight:'bold' }}><Button>참여</Button></Link>:null}
                                        <Typography style={{ color:'red' }}>
                                            {value.sur_State === 1? "진행중" : "마감"}
                                        </Typography>
                                        <Typography>
                                            #{TAGENUM[value.tag_ID]}
                                        </Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    <Grid item xs={12} >
                        {reqMain&&<Pagination onChange={(e)=>callPage((e.target.ariaLabel).split(' ')[3])} count={reqMain.paginationInfo.lastPage} color="primary" />}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Main;