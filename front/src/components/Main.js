import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import { InputBase, makeStyles } from '@material-ui/core';
import { Paper, useMediaQuery, useTheme } from '@mui/material';
import MyResponsivePie from './result/charts/MyResponsivePie'
import MyResponsiveLine from './result/charts/MyResponsiveLine'
import { BackgoundColor, FontColor } from './common/UI/TagColor'

import SurveyDialog from './common/UI/SurveyDialog';

import {
    FiCard,
    FiCardContent,
    FiCardMedia
} from "./common/UI/FullImageCard";

const useStyles = makeStyles({

    fiCardContent: {
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,.24)"
    },
});


const Main = ({ data, accAgeGenderData, accAgeTotalData, accGenderTotalData, reqMain, TAGENUM, setTagSearch, tagSearch, alignment, setAlignment, pageNum, pageChange, setSearchText, searchText }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const classes = useStyles();


    return (
        <>
            <Container sx={{ py: 2 }} maxWidth="lg">
                <Typography variant="h5" marginLeft="5px" style={{ fontWeight: 'bold', color: "#2E2E2E" }}>
                    설문 통계
                </Typography>

                <div style={{ flexGrow: 1 }} />

                <hr style={{ borderWidth: 1, borderColor: "#2E2E2E" }} />
            </Container>

            {isMobile ?
                <SurveyDialog
                    data={data}
                    accAgeGenderData={accAgeGenderData}
                    accAgeTotalData={accAgeTotalData}
                    accGenderTotalData={accGenderTotalData}
                />
                :
                <Container sx={{ py: 1 }} maxWidth="lg">
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={12} lg={12} >

                            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}  >

                                <Grid item xs={12} sm={6} md={6} lg={6}>

                                    <Paper>
                                        <Grid container                     >
                                            <Grid item place xs={2.5} style={{ backgroundColor: "#9AAFD9" }} >
                                            </Grid>

                                            <Grid item xs={9.5} >
                                                <Typography variant="h6" style={{ fontWeight: 'bold', margin: "5px" }}>
                                                    누적 설문 조사
                                                </Typography>
                                                <Typography variant="h6" style={{ color: 'gray', margin: "5px" }}>
                                                    {data.survey_Total} 개
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                </Grid>


                                <Grid item xs={12} sm={6} md={6} lg={6}>

                                    <Paper>
                                        <Grid container>

                                            <Grid item xs={2.5} style={{ backgroundColor: "#9AAFD9" }}>
                                            </Grid>

                                            <Grid item xs={9.5}>
                                                <Typography variant="h6" style={{ fontWeight: 'bold', margin: "5px" }} >
                                                    누적 설문 응답 수
                                                </Typography>
                                                <Typography variant="h6" style={{ color: 'gray', margin: "5px" }}>
                                                    {data.part_Total} 명
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </Paper>

                                </Grid>
                            </Grid>


                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <Paper>
                                <Typography variant="h6" marginLeft="5px" align="center" style={{ fontWeight: 'bold', backgroundColor: '#C7DBF4' }}>
                                    연령대 별 누적 이용자 비율
                                </Typography>
                                <div style={{ height: 250 }}>
                                    <MyResponsiveLine data={accAgeGenderData} />
                                </div>
                            </Paper>
                        </Grid>


                        <>
                            <Grid item xs={12} sm={6} md={6} lg={3}>
                                <Paper>
                                    <Typography variant="h6" marginLeft="5px" align="center" style={{ fontWeight: 'bold', backgroundColor: '#C7DBF4' }}>
                                        누적 이용자 연령 비율
                                    </Typography>
                                    <div style={{ height: 250 }}>
                                        <MyResponsivePie data={accAgeTotalData} />
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={3}>
                                <Paper>
                                    <Typography variant="h6" marginLeft="5px" align="center" style={{ fontWeight: 'bold', backgroundColor: '#C7DBF4' }}>
                                        누적 이용자 성별 비율
                                    </Typography>
                                    <div style={{ height: 250 }}>
                                        <MyResponsivePie data={accGenderTotalData} />
                                    </div>
                                </Paper>
                            </Grid>
                        </>

                    </Grid>
                </Container>
            }


            <Container sx={{ py: 3 }} maxWidth="lg">

                <Grid container>
                    <Grid item xs={6} sm={8} md={8} lg={9}>
                        <Typography variant="h5" marginLeft="5px" style={{ fontWeight: 'bold', color: "#2E2E2E" }}>
                            설문 목록
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sm={4} md={4} lg={3}>
                        <Container maxWidth="lg" align="center">
                            <InputBase InputBase
                                style={{
                                    height: '35px',
                                    width: '100%',
                                    borderRadius: '30px',
                                    border: '3px solid #2E2E2E',
                                    textAlign: 'center',
                                    fontSize: '20px',
                                }}
                                value={searchText}
                                placeholder="   Search..."
                                onChange={e => setSearchText(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}>
                            </InputBase>
                        </Container>
                    </Grid>
                </Grid>
                <hr style={{ borderWidth: 1, borderColor: "#2E2E2E" }} />
            </Container>

            {/* 태그 출력 */}
            <Container maxWidth="sm" align='center'  >
                <Grid container
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    rowSpacing={2}>
                    {data.sur_Tag && data.sur_Tag.map((value) =>
                        <Grid item xs={3} sm={2} md={2} lg={2}>
                            <Button
                                elevation={1}
                                style={{ boxShadow: "0px 5px 6px -6px", border: "1px solid #F2F2F2", fontWeight: 'bold', borderRadius: '10px', backgroundColor: "#FAFAFA", color: 'Gray', width: "80px", height: "30px" }}
                                id={`${value.tag_ID}`} onClick={e => { pageChange(1); setTagSearch(e.target.id === tagSearch ? '' : e.target.id); }}
                                value={value.tag_Name}>
                                {value.tag_Name}
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Container>

            <Container sx={{ py: 5 }} maxWidth="lg">
                <Grid container spacing={4} >
                    {/* 설문 리스트 출력 */}
                    {reqMain && reqMain.surveylist.map((value) => (
                        <Grid item key={value._id} xs={12} sm={6} md={6} lg={4}>
                            <Card sx={{ display: 'flex', flexDirection: 'column' }} >

                                <FiCard
                                    justify='center'
                                    alignItems="center"
                                    className={classes.card} style={{ height: "250px" }}>
                                    <FiCardMedia
                                        media="picture"
                                        alt="Contemplative Reptile"
                                        image={(value.sur_Img)}
                                        title="Contemplative Reptile"
                                    />
                                    <FiCardContent justify='center'
                                        className={classes.fiCardContent} >
                                        <Typography sx={{ fontWeight: 'bold', height: "250px" }} variant="h6" component="p">
                                            {(value.sur_Title).length > 20 ? (value.sur_Title).substring(0, 20) + "..." : (value.sur_Title)}
                                        </Typography>
                                    </FiCardContent>
                                </FiCard>

                                {/* <CardMedia margin={1} style={{ height: "250px" }} image={(value.sur_Img)}/> */}
                                {TAGENUM[value.tag_ID] != null ?
                                    <Typography align='center' style={{ borderRadius: "5px", backgroundColor: BackgoundColor({ tagid: `${value.tag_ID}` }), color: FontColor({ tagid: `${value.tag_ID}` }), width: "25%", marginLeft: "10px", marginTop: "10px" }}>
                                        {TAGENUM[value.tag_ID]}
                                    </Typography>
                                    :
                                    <Typography align='center' style={{ borderRadius: "5px", backgroundColor: "#E6E6E6", color: "#848484", width: "28%", marginLeft: "10px", marginTop: "10px" }}>
                                        태그없음
                                    </Typography>
                                }


                                <Paper elevation={1} style={{ margin: "10px", boxShadow: "0px 5px 6px -6px" }} >
                                    <div justify='center' style={{ height: "80px" }}>
                                        <Typography align='center' variant="body2" component="p" margin={2}>
                                            {(value.sur_Content).length > 55 ? (value.sur_Content).substring(0, 55) + "..." : (value.sur_Content)}
                                        </Typography>
                                    </div>
                                </Paper>
                                <CardActions style={{ height: "20px" }}>
                                    {/* 설문 참여 링크 이동 */}
                                    {value.sur_State === 1 ?
                                        <Typography style={{ color: 'red' }}>
                                            진행중
                                        </Typography> :
                                        <Typography style={{ color: 'gray' }}>
                                            마감
                                        </Typography>
                                    }
                                    <div style={{ flexGrow: 1 }} />
                                    {value.sur_State === 1 ? <Link to={`/SurveySubmitPage/${value._id}`} style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}><Button><Typography>참여</Typography></Button></Link> : null}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container>
                <Grid container justifyContent="center">
                    {reqMain && <Pagination count={5} shape="rounded" showFirstButton showLastButton page={pageNum} onChange={(_, page) => { pageChange(page) }} count={reqMain.paginationInfo.totalPageCount} />}
                </Grid>
            </Container>
        </>
    );
};

export default Main;