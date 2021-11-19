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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Main = () => {
    return (
        <>
            {/* <main> */}
                {/* Hero unit */}
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
                    <Button >#운동</Button>
                    <Button >#연애</Button>
                    <Button >#공부</Button>
                    <Button >#음식</Button>
                    <Button >#취미</Button>
                    <Button >#패션</Button>
                    </Stack>
                </Container>
                </Box>
                <Container sx={{ py: 5 }} maxWidth="md">
                {/* End hero unit */}
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Chart
                                width={'400px'}
                                height={'300px'}
                                chartType="AreaChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Year', 'Sales'],
                                    ['2013', 250],
                                    ['2014', 300],
                                    ['2015', 450],
                                    ['2016', 500],
                                ]}
                                // chart={{ captionFontSize: "20px", }}
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
                                    ['10대', 150],
                                    ['20대', 580],
                                    ['30대', 210],
                                    ['40대', 180],
                                    ['50대', 170],
                                    ['60대', 110],
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
                                    ['여성', 150],
                                    ['남성', 200],
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
                    </Grid>
                </Container>
            {/* </main> */}
        </>
    );
};

export default Main;