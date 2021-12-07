import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Gongback } from '../../common/Function';

const Login = ({theme, handleSubmit}) => {
    return (
        <>
            {/* <ThemeProvider theme={createTheme()}> */}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                            type="email"
                            margin="normal"
                            required
                            fullWidth
                            id="User_Email"
                            label="이메일"
                            name="User_Email"
                            autoComplete="off"
                            autoFocus
                            inputProps={{maxLength: 33}}
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='password'
                            name="User_Password"
                            label="비밀번호"
                            id="User_Password"
                            autoComplete="off"
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign In
                            </Button>
                            <Grid container>
                            <Grid item xs>
                                <Link href="/FindIDPage" variant="body2">
                                    ID 찾기
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/FindPWPage" variant="body2">
                                    PW 찾기
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/RegisterPage" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container><Gongback num={3} />
            {/* </ThemeProvider><br/><br/><br/> */}
        </>
    );
};

export default Login;