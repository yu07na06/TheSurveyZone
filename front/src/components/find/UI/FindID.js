import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Gongback } from '../../common/Function';

const FindID = ({ handleSubmit, onChange, phoneNumber, }) => {
    return (
        <>
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
                    아이디 찾기
                </Typography>
                    <Box component="form" onSubmit={e=>handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="user_Name"
                        label="성함"
                        name="user_Name"
                        autoComplete="off"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="user_Tel"
                        label="전화번호"
                        onChange={onChange}
                        value={phoneNumber} 
                        inputProps={{ maxLength: 13 }}
                        type="tel"
                        id="user_Tel"
                        autoComplete="off"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        아이디 찾기
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
        </>
    );
};

export default FindID;