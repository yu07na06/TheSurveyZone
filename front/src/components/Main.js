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
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { PieSeries, Title, Chart } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const Main = ({ data, accUserData, accAgeData, accSexData, reqMain, TAGENUM, setTagSearch, tagSearch, alignment, setAlignment, pageNum, pageChange, setSearchText, classes}) => {
    const accNewUserData = []
    for (const value of accUserData) {
        if(value[0]==="day") continue;
        accNewUserData.push({ day:value[0], people:value[1] })
    }

    const accNewData = []
    for (const value of accAgeData) {
        if(value[0]==="연령") continue;
        accNewData.push({ age:value[0], people:value[1] })
    }

    const accNewSexData = []
    for (const value of accSexData) {
        if(value[0]==="성별") continue;
        accNewSexData.push({ sex:value[0], people:value[1] })
    }

    return (
        <>
            {/* 태그 출력 */}
            <Box sx={{ bgcolor: 'background.paper', pt: 2 }}>
                <Container maxWidth="lg">
                    <Stack
                        direction="row"
                        justifyContent="center"
                    >
                    <ToggleButtonGroup
                        color="success"
                        value={alignment}
                        exclusive
                        onChange={(e,a)=>{ console.log("뭐 출력하니?", a); setAlignment(a);}}
                    >
                        { data.sur_Tag && data.sur_Tag.map((value) => 
                            <ToggleButton id={`${value.tag_ID}`} onClick={e=>{ pageChange(1); setTagSearch(e.target.id===tagSearch? '':e.target.id); }} value={value.tag_Name}>{'#'+value.tag_Name}</ToggleButton>
                        )}
                    </ToggleButtonGroup>
                    </Stack>
                    
                    <Stack
                        direction="row"
                        justifyContent="center"
                    >
                    <SearchIcon />
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={e=>setSearchText(e.target.value)}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                    </Stack>
                </Container>
            </Box>

            
            <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {/* 누적 이용자 */}
                    <Grid item xs={4}>
                        <Chart
                            data={accNewUserData}
                        >
                            <PieSeries
                                argumentField="day"
                                valueField="people"
                                innerRadius={0.6}
                            />
                            <Title
                                text="누적 이용자"
                            />
                            <Animation />
                        </Chart>
                    </Grid>

                    {/* 누적 이용자 연령 비율 */}
                    <Grid item xs={4}>
                        <Chart
                            data={accNewData}
                        >
                            <PieSeries
                                argumentField="age"
                                valueField="people"
                                innerRadius={0.6}
                            />
                            <Title
                                text="누적 이용자 연령 비율"
                            />
                            <Animation />
                        </Chart>
                    </Grid>

                    {/* 누적 이용자 성별 비율 */}
                    <Grid item xs={4}>
                        <Chart
                            data={accNewSexData}
                        >
                            <PieSeries
                                argumentField="sex"
                                valueField="people"
                                innerRadius={0.6}
                            />
                            <Title
                                text="누적 이용자 성별 비율"
                            />
                            <Animation />
                        </Chart>
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

                    <br/>
                    <Grid container justifyContent="center">
                        {reqMain&&<Pagination showFirstButton showLastButton page={pageNum} onChange={(_, page)=>{ pageChange(page) }} count={reqMain.paginationInfo.totalPageCount} color="primary" />}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Main;