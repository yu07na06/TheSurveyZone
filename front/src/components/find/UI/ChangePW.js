import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { createTheme  } from '@mui/material/styles';
import { Gongback } from '../../common/Function';

const ChangePW = ({handleSubmit, confirm, PWNOTMATCH, }) => {
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
                    <Avatar sx={{ m: 1 }}>
                        <ContactSupportIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        비밀번호 재설정
                    </Typography>
                        <Box component="form" onSubmit={e=>handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                            <TextField
                            type="passWord"
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e)=>confirm(e)}
                            id="User_Password"
                            label="비밀번호"
                            inputProps={{ maxLength: 15 }}
                            name="User_Password"
                            autoComplete="off"
                            autoFocus
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passWordConfirm"
                            label="비밀번호 확인"
                            onChange={(e)=>confirm(e)}
                            inputProps={{ maxLength: 15 }}
                            type="passWord"
                            id="passWordConfirm"
                            autoComplete="off"
                            />

                            {/* PWNOTMATCH 값에 따라 비밀번호 일치 불일치 표시 보여줄거에요! */}
                            {!PWNOTMATCH &&
                            <Grid item xs={12}>
                            <Typography variant="h7" style={{color:"#FF5555"}}>* 비밀번호가 일치하지 않습니다.</Typography>
                            </Grid> 
                            }

                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            비밀번호 재설정
                            </Button>
                            <Grid container>
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

export default ChangePW;