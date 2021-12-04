import React, { useState }  from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Menu, MenuItem, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logout as logoutAPI } from '../../../lib/api/auth';

import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import MenuIcon from "@material-ui/icons/Menu";
import { fontSize } from '@mui/system';

export const useStyles = makeStyles((theme) => ({

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
    menuButton: {
        marginRight: theme.spacing(2)
      },
    }
  }));
  
  const Header = () => {
    const [cookies, _, removeCookie] = useCookies(['Authorization']);
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    // const userName = useSelector(state => state.loginReducer.user_Name);

    console.log("cookies.Authorization", cookies.Authorization);
    const userName = localStorage.getItem('user_Name');

    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClick = pageURL => {
      history.push(pageURL);
      setAnchorEl(null);
    };
   
  return (
    <>
    <AppBar position="static" >
        <Toolbar  style={{textDecoration:'none', backgroundColor:'#5B6FD3' }}>
        <Link to='/' style={{textDecoration:'none', color:'white'}}>
          <Typography variant="h5" noWrap style = {{fontWeight:'bold'}}>
           The Survey Zone
          </Typography>
        </Link>
    
        <div style={{flexGrow: 1}}/>
      
        {isMobile ? (
          //Mobile일 경우
      <>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
        >
        <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
           {cookies.Authorization? 
           <>
          <MenuItem>
          <AccountCircle style={{paddingRight: "10px"}}/>
          <Typography variant="body2" noWrap>
           {userName}
          </Typography>
          </MenuItem>
          </>
          :<></>}
          <MenuItem onClick={()=>handleMenuClick('/CreateSurveyPage')}>
            <NoteAddOutlinedIcon style={{paddingRight: "10px"}}/>
            <Typography variant="body2" noWrap>
            설문지 생성
            </Typography>
          </MenuItem>
          <MenuItem onClick={()=>handleMenuClick('/MySurveyPage')}>
            <ContentPasteIcon style={{paddingRight: "10px"}}/>
            <Typography variant="body2" noWrap>
            내 설문지
            </Typography>
          </MenuItem>
          {!cookies.Authorization?
          <>
          <MenuItem onClick={()=>handleMenuClick('/LoginPage')}>
            <LoginIcon style={{paddingRight: "10px"}}/>
            <Typography variant="body2" noWrap>
            로그인
            </Typography>
          </MenuItem>
          <MenuItem onClick={()=>handleMenuClick('/RegisterPage')}>
            <PersonAddAlt1Icon style={{paddingRight: "10px"}}/>
            <Typography variant="body2" noWrap>
            회원가입
            </Typography>
          </MenuItem>
          </>
          :
          <>
           <MenuItem onClick={()=>{handleMenuClick('/');logoutAPI().then(res=>{removeCookie('Authorization');console.log("로그아웃 성공", res)}).catch(err=>console.log("로그아웃 실패", err));}}>
           <LogoutIcon style={{paddingRight: "10px"}}/>
            <Typography variant="body2" noWrap>
            로그아웃
            </Typography>
            </MenuItem>
          </>
        }
        </Menu>
      </>
    ) : 
          //PC환경 (Width가 좁을 경우 모바일환경처럼 출력)
          (
            <>
            <Tabs opacity="1" aria-label="simple tabs example" >
            {/* <Link to='/' style={{textDecoration:'none', color:'white' }}><Tab label="홈" style={{fontWeight:'bold'}}/></Link> */}
            <Link to='/CreateSurveyPage' style={{textDecoration:'none', color:'white' }}><Tab label="설문지 생성" style={{fontWeight:'bold', fontSize:'17px'}}/></Link>
            <Link to='/MySurveyPage'style={{textDecoration:'none', color:'white'}}><Tab label="내 설문지" style={{fontWeight:'bold', fontSize:'17px'}}/></Link>
            </Tabs>
            {!cookies.Authorization?
                <>
                <Tabs>
                <Link to='/LoginPage'style={{textDecoration:'none', color:'white'}}><Tab label="로그인" style={{fontWeight:'bold', fontSize:'17px'}}/></Link>
                <Link to='/RegisterPage'style={{textDecoration:'none', color:'white'}}><Tab label="회원가입" style={{fontWeight:'bold', fontSize:'17px'}}/></Link>
                </Tabs>
                
                </>
             :
             <>
             <Tabs>
             <Link to='/'style={{textDecoration:'none', color:'white'}}><Tab label="로그아웃" onClick={()=>{logoutAPI().then(res=>{removeCookie('Authorization');console.log("로그아웃 성공", res)}).catch(err=>console.log("로그아웃 실패", err));}} style={{fontWeight:'bold' , fontSize:'17px'}}/></Link>
             </Tabs>
             <AccountCircle  fontSize="medium" color="action" style={{paddingRight: "5px"}}/>
             <Typography variant="body1" noWrap style={{textDecoration:'none', color:'white', fontWeight:'bold'}}>
                {userName} 님 반갑습니다.
             </Typography>
             </>
             }
            </>
          )}           
          </Toolbar>
          </AppBar>
      </>
  );
};
export default Header;