import React, { useEffect } from 'react';
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
import Pagination from '@mui/material/Pagination';

const Main = ({cards, data}) => {
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 2,
                }}
            >
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
            <Container sx={{ py: 5 }} maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Chart
                            width={'400px'}
                            height={'300px'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Year', 'Sales'],
                                ['6월', 3],
                                ['7월', 8],
                                ['8월', 9],
                                ['9월', 10],
                                ['10월', 12],
                                ['11월', data.part_Total],
                            ]}
                            options={{
                                title: '누적 이용자 수',
                                titleFontSize: "18",
                                captionFontSize: "20px",
                                vAxis: { minValue: 0 },
                                chartArea: { width: '90%', height: '70%' },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <Chart
                            width={'400px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['연령', '연령수'],
                                ['10대', data.part_Age.age_10],
                                ['20대', data.part_Age.age_20],
                                ['30대', data.part_Age.age_30],
                                ['40대', data.part_Age.age_40],
                                ['50대', data.part_Age.age_50],
                                ['60대', data.part_Age.age_60],
                            ]}
                            options={{
                                title: '누적 이용자 연령 비율',
                                titleFontSize: "18",
                                pieHole: 0.5,
                                chartArea: { width: '80%', height: '70%' },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <Chart
                            width={'400px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['성별', '성별수'],
                                ['여성', data.part_Gender.woman],
                                ['남성', data.part_Gender.man],
                            ]}
                            options={{
                                title: '누적 이용자 성별 비율',
                                titleFontSize: "18",
                                pieHole: 0.5,
                                chartArea: { width: '80%', height: '70%' },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </Grid>

                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Heading
                                    </Typography>
                                    <Typography>
                                    This is a media card. You can use this section to describe the
                                    content.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">참여</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <Pagination count={5} color="primary" />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Main;