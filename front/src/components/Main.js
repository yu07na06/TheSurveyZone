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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Main = () => {
    return (
        <>
            <main>
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
            <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                <Grid xs={10} sm={6} md={6}>
                    <Typography variant="h5" fontWeight="bold">누적 이용자 수</Typography><br/>
                    <Typography variant="h2" fontWeight="bold">50</Typography>
                    <Typography>만 명</Typography>
                </Grid>
                <Grid xs={10} sm={6} md={6}>
                    <Typography variant="h5" fontWeight="bold">누적 이용자 수</Typography><br/>
                    <Typography variant="h2" fontWeight="bold">50</Typography>
                    <Typography>만 명</Typography>
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
            </main>
        </>
    );
};

export default Main;