import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Gongback } from '../../common/Function';

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
      width: '100%',
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

const Register = ({ onSubmit, PWNOTMATCH, onChange, phoneNumber, errorText, emailText, }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          회원가입
        </Typography>

        <form className={classes.form} noValidate onSubmit={(e)=>onSubmit(e)}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                onChange ={onChange}
                variant="outlined"
                required
                fullWidth
                name="User_Email"
                id="User_Email"
                label="이메일"
                autoComplete="off"
                inputProps={{maxLength: 33}}
              />
            </Grid>

            {!emailText ?
              <Grid item xs={12}>
                <Typography variant="h7" style={{color:"#FF5555"}}>* 이미 존재하는 이메일입니다.</Typography>
              </Grid> : null
            }

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
                onChange={onChange}
                inputProps={{maxLength: 15}}
              />
            </Grid>
  
            <Typography variant="h7" style={{color:"#FF5555"}}>숫자, 영문, 특수문자를 포함한 8자이상 작성해주세요</Typography>
            
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
                onChange={onChange}
                inputProps={{maxLength: 15}}
              />
            </Grid>

            {!PWNOTMATCH &&
            <Grid item xs={12}>
            <Typography variant="h7" style={{color:"#FF5555"}}>* 비밀번호가 일치하지 않습니다.</Typography>
            </Grid>}

            <Grid item xs={12} sm={4}>
                <TextField
                    type="text"
                    maxRows='5'
                    variant="outlined"
                    required
                    fullWidth
                    id="User_Name"
                    label="성함"
                    name="User_Name"
                    autocomplete="false"
                    inputProps={{maxLength: 15}}
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
                onChange={onChange}
                value={phoneNumber} 
                inputProps={{maxLength: 13}}
              />
            </Grid>
  
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox  name="checkbox" value="allowExtraEmails" color="primary"  onChange={onChange}/>}
                label="데이터 정보 수집에 동의하십니까?"
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

          {errorText &&
            <Grid item xs={12}>
              <Typography variant="h7" style={{color:"#FF5555"}}>{errorText}</Typography>
            </Grid> 
          }<br/>
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/LoginPage" variant="body2">
                이미 계정이 있나요? 로그인 하러가기
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Gongback num={2} />
    </Container>
  );
}

export default Register;