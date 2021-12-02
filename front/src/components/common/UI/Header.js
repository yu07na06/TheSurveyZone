// import React, { useState }  from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import { Tab, Tabs } from '@mui/material';
// import { alpha, makeStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { logout as logoutAPI } from '../../../lib/api/auth';

// // export const useStyles = makeStyles((theme) => ({
// //     search: {
// //       position: 'relative',
// //       borderRadius: theme.shape.borderRadius,
// //       backgroundColor: alpha(theme.palette.common.white, 0.15),
// //       '&:hover': {
// //         backgroundColor: alpha(theme.palette.common.white, 0.25),
// //       },
// //       marginRight: theme.spacing(2),
// //       marginLeft: 0,
// //       width: '100%',
// //       [theme.breakpoints.up('sm')]: {
// //         marginLeft: theme.spacing(2),
// //         width: 'auto',
// //       },
// //     },
// //     searchIcon: {
// //       padding: theme.spacing(0, 2),
// //       height: '100%',
// //       position: 'absolute',
// //       pointerEvents: 'none',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //     },
// //     inputRoot: {
// //       color: 'inherit',
// //     },
// //     inputInput: {
// //       padding: theme.spacing(1, 1, 1, 0),
// //       paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
// //       transition: theme.transitions.create('width'),
// //       width: '100%',
// //       [theme.breakpoints.up('md')]: {
// //         width: '20ch',
// //       },
// //     }
// //   }));
  
//   const Header = () => {
//   const [cookies, _, removeCookie] = useCookies(['Authorization']);

//   return (
//       <>
//           <AppBar position="relative">
//               <Toolbar>
                
                
//                 <Tabs opacity="1" aria-label="simple tabs example" >
//                     <Link to='/' style={{textDecoration:'none', color:'white' }}><Tab label="홈" style={{fontWeight:'bold'}}/></Link>
//                     <Link to='/CreateSurveyPage' style={{textDecoration:'none', color:'white' }}><Tab label="설문지 생성" style={{fontWeight:'bold'}}/></Link>
//                     <Link to='/MySurveyPage'style={{textDecoration:'none', color:'white'}}><Tab label="내 설문지" style={{fontWeight:'bold'}}/></Link>
                  
//                     {/**/}
//                     {!cookies.Authorization?
//                       <>
//                         <Link to='/LoginPage'style={{textDecoration:'none', color:'white'}}><Tab label="로그인" style={{fontWeight:'bold'}}/></Link>
//                         <Link to='/RegisterPage'style={{textDecoration:'none', color:'white'}}><Tab label="회원가입" style={{fontWeight:'bold'}}/></Link>
//                       </>
//                     :<Link to='/'style={{textDecoration:'none', color:'white'}}><Tab label="로그아웃" onClick={()=>{removeCookie('Authorization'); logoutAPI().then(res=>console.log("로그아웃 성공", res)).catch(err=>console.log("로그아웃 실패", err))}} style={{fontWeight:'bold'}}/></Link>}

//                 </Tabs>
//               </Toolbar>
//           </AppBar>
//       </>
//   );
// };

// export default Header;


import React, { useEffect, useRef, useState }  from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Menu, MenuItem, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logout as logoutAPI } from '../../../lib/api/auth';
import { useSelector } from 'react-redux';

export const useStyles = makeStyles((theme) => ({
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
        marginLeft: theme.spacing(3),
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
    const userName = localStorage.getItem('user_Name');

    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClick = pageURL => {
      history.push(pageURL);
      setAnchorEl(null);
    };
    const menuItems = !cookies.Authorization?
    [
      {
        menuTitle: "설문지 생성",
        pageURL: "/CreateSurveyPage"
      },
      {
        menuTitle: "내 설문지",
        pageURL: "/MySurveyPage"
      },
      {
        menuTitle: "로그인",
        pageURL: "/LoginPage"
      },
      {
        menuTitle: "회원가입",
        pageURL: "/RegisterPage"
      }
    ]:[{
      menuTitle: "설문지 생성",
      pageURL: "/CreateSurveyPage"
    },
    {
      menuTitle: "내 설문지",
      pageURL: "/MySurveyPage"
    },
    {
      menuTitle: "로그아웃",
      pageURL: "/"
    }];
  return (
      <>
          <AppBar position="static">
              <Toolbar>
              <Link to='/' style={{textDecoration:'none', color:'white' }}>
                <Typography variant="h6" noWrap>
                 The Survey Zone
                </Typography>
              </Link>
          
              <div style={{flexGrow: 1}}/>
            
              {isMobile ? (
                //Mobile일 경우
            <>
              <div>{`${userName}님`}</div>
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
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={
                      () => {
                        if(menuTitle==="로그아웃"){
                          logoutAPI().then(res=>{removeCookie('Authorization');console.log("로그아웃 성공", res)}).catch(err=>console.log("로그아웃 실패", err));
                          // removeCookie('Authorization');
                        }
                        handleMenuClick(pageURL);
                        }
                      }>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : 
          //PC환경 (Width가 좁을 경우 모바일환경처럼 출력)
          (
            <>
            <Tabs opacity="1" aria-label="simple tabs example" >
            {/* <Link to='/' style={{textDecoration:'none', color:'white' }}><Tab label="홈" style={{fontWeight:'bold'}}/></Link> */}
            <Link to='/CreateSurveyPage' style={{textDecoration:'none', color:'white' }}><Tab label="설문지 생성" style={{fontWeight:'bold'}}/></Link>
            <Link to='/MySurveyPage'style={{textDecoration:'none', color:'white'}}><Tab label="내 설문지" style={{fontWeight:'bold'}}/></Link>
           
            {!cookies.Authorization?
              <>
                <Link to='/LoginPage'style={{textDecoration:'none', color:'white'}}><Tab label="로그인" style={{fontWeight:'bold'}}/></Link>
                <Link to='/RegisterPage'style={{textDecoration:'none', color:'white'}}><Tab label="회원가입" style={{fontWeight:'bold'}}/></Link>
              </>
             :
              <>
              <Link to='/'style={{textDecoration:'none', color:'white'}}><Tab label="로그아웃" onClick={()=>{logoutAPI().then(res=>{removeCookie('Authorization');console.log("로그아웃 성공", res)}).catch(err=>console.log("로그아웃 실패", err));}} style={{fontWeight:'bold'}}/></Link>
              <div>{userName}</div>
              </>
             }
             
             </Tabs>

            </>
          )}           
              </Toolbar>
          </AppBar>
      </>
  );
};
export default Header;