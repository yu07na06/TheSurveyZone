import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    typography: {
      allVariants: {
        color: "red"
      },
    },
  }));
  
const Register = ({onSubmit, NOTMATCH, onChange, inputText, }) => {
    const classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
  
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="User_Email"
                  id="User_Email"
                  label="이메일"
                  autoComplete="off"
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="User_Password"
                  label="비밀번호"
                  type="password"
                  id="User_Password"
                  autocomplete="new-password"
                  onChange={onChange}   // onChange를 통해서 비밀번호 2개를 일치하게 작성했는지 검사한다
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passWordConfirm"
                  label="비밀번호확인"
                  type="passWord"
                  id="passWordConfirm"
                  autoComplete="off"
                  onChange={onChange}   //onChange를 통해서 비밀번호 2개를 일치하게 작성했는지 검사한다
                />
              </Grid>
  
              {/* NOTMATCH 값에 따라 비밀번호 일치 불일치 표시 보여줄거에요! */}
              {NOTMATCH &&
              <Grid item xs={12}>
              <Typography variant="h7" style={{color:"#FF5555"}}>* 비밀번호가 일치하지 않습니다.</Typography>
              </Grid> 
              }
  
              <Grid item xs={12} sm={4}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="User_Name"
                      label="성함"
                      name="User_Name"
                      autocomplete="false"
                    />
              </Grid>
  
              <Grid item xs={12} sm={8}>
              <TextField
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                  id="User_Tel"
                  label="전화번호"
                  name="User_Tel"
                  value={inputText}     // 유효성 검사를 거친 값을 보여주기 위함
                />
              </Grid>
  
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="목숨을 우리에게 주는것을 동의합니까?"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              회원가입
            </Button>
  
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  이미 계정이 있나요? 로그인 하러가기
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
    );
  }
export default Register;