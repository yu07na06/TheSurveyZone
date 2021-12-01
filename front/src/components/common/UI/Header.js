import React  from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { Tab, Tabs } from '@mui/material';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logout as logoutAPI } from '../../../lib/api/auth';

const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    }
  }));
  
  const Header = () => {
  const [cookies, _, removeCookie] = useCookies(['Authorization']);
  const classes = useStyles();

  return (
      <>
          <AppBar position="relative">
              <Toolbar>
              <SearchIcon />
              <InputBase
                  placeholder="Search…"
                  classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  />
              
              <Tabs opacity="1" aria-label="simple tabs example" >
                  <Link to='/' style={{textDecoration:'none', color:'white' }}><Tab label="홈" style={{fontWeight:'bold'}}/></Link>
                  <Link to='/CreateSurveyPage' style={{textDecoration:'none', color:'white' }}><Tab label="설문지 생성" style={{fontWeight:'bold'}}/></Link>
                  <Link to='/MySurveyPage'style={{textDecoration:'none', color:'white'}}><Tab label="내 설문지" style={{fontWeight:'bold'}}/></Link>
                 
                  {/**/}
                  {!cookies.Authorization?
                    <>
                      <Link to='/LoginPage'style={{textDecoration:'none', color:'white'}}><Tab label="로그인" style={{fontWeight:'bold'}}/></Link>
                      <Link to='/RegisterPage'style={{textDecoration:'none', color:'white'}}><Tab label="회원가입" style={{fontWeight:'bold'}}/></Link>
                    </>
                   :<Link to='/'style={{textDecoration:'none', color:'white'}}><Tab label="로그아웃" onClick={()=>{removeCookie('Authorization'); logoutAPI().then(res=>console.log("로그아웃 성공", res)).catch(err=>console.log("로그아웃 실패", err))}} style={{fontWeight:'bold'}}/></Link>}

              </Tabs>
              </Toolbar>
          </AppBar>
      </>
  );
};

export default Header;