import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainList as mainListAPI } from '../lib/api/home';
import { chartData } from '../modules/chartReducer';
import ErrorSweet from './common/modules/ErrorSweet';
import Main from './Main';
import { debounceText } from './common/debounceFunction';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Grid, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';


const MainComp = ({ match }) => {
    const data = useSelector(state=>state.chartReducer.responseAcc);
    const err = useSelector(state=>state.chartReducer.err);
    const [ reqMain, setReqMain ] = useState(null);
    const [ pageNum, setPageNum ] = useState(1);
    const [ tagSearch, setTagSearch ] = useState('');
    const [ searchText, setSearchText ] = useState('');
    const dispatch = useDispatch();

    const TAGENUM = {};
    for (const value of data.sur_Tag) { TAGENUM[value.tag_ID] = value.tag_Name; } // 태그 enum으로 사용하기
    
    const [accAgeGenderData, accAgeTotalData, accGenderTotalData] = dataProcessing(data); // 차트 데이터 가공
    const pageChange = page => setPageNum(page); // 페이징

    useEffect(()=>{
        if(err !== null){
            ErrorSweet('error', null, "네트워크 오류", err, null);
        }
    },[err]);

    // 홈에서 홈버튼 클릭 시,
    useEffect(()=>{
        setPageNum(1);
        setTagSearch('');
        setSearchText('');
    },[match.params, dispatch]);

    // 차트 요청 및 main 리스트/태그/검색 요청
    useEffect(()=>{
        dispatch(chartData());
        if(pageNum===undefined || tagSearch===undefined || searchText===undefined) return;
        mainListAPI(pageNum, tagSearch, searchText)
            .then(res => setReqMain(res.data))
            .catch(err => ErrorSweet('error', null, "네트워크 오류", err, null))
    },[pageNum, tagSearch])
        
    useEffect(()=>{
        if(pageNum===undefined || tagSearch===undefined || searchText===undefined) return;
        debounceText(pageNum, tagSearch, searchText, setReqMain, dispatch);
    },[searchText])

    return (
        <>
            <Main
                data={data}
                accAgeGenderData={accAgeGenderData}
                accAgeTotalData={accAgeTotalData}
                accGenderTotalData={accGenderTotalData}
                reqMain={reqMain}
                TAGENUM={TAGENUM}
                setTagSearch={setTagSearch}
                tagSearch={tagSearch}
                pageNum={pageNum}
                pageChange={pageChange}
                setSearchText={setSearchText}
             />      
        </>
    );
};

export default MainComp;


export const Comment = () => {
    const [ commentList, setCommentList ] = useState([]);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const addCom = (e) => {
        e.preventDefault();
        console.log(e.target.nickName.value);
        console.log(e.target.password.value);
        console.log(e.target.inputText.value);
        setCommentList([...commentList, e.target.inputText.value ]);
        
        const nickName = document.querySelector('#nickName');
        const password = document.querySelector('#password');
        const inputText = document.querySelector('#inputText');
        nickName.value = '';
        password.value = '';
        inputText.value = '';

        // api 요청할 데이터 form 
        const commentObj = { nickName, password, inputText };
    }

    return(
        <>
            <Tooltip title="QRcode 생성">
                <IconButton onClick={handleClick} size="small">
                    <CommentIcon color="action" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                    }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Paper rows={2} rowsmax={8}>
                    {/* <Paper sx={{ bgcolor: '#F2EFFB', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> */}
                        <Grid container spacing={2}>
                            {commentList.map((v, i)=>
                                <>
                                    <Grid item xs={10}>
                                        <Typography>{v}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <DelComment id={i}/>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Paper>
                </MenuItem>
                <MenuItem>
                    <Box component="form" onSubmit={e=>addCom(e)}>
                        <TextField id='nickName' label="닉네임" inputProps={{maxLength: 8}} required/>
                        <TextField id='password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                        <TextField id='inputText' fullWidth label="입력란" inputProps={{maxLength: 30}} required/>
                        <Button type="submit">댓글달기</Button>
                    </Box>
                </MenuItem>
                <Button onClick={handleClose}>닫기</Button>
            </Menu>
        </>
    );
}

export const DelComment = ({ id }) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const delCom = (e) => {
        e.preventDefault();
        console.log(e.target.nickName.value);
        console.log(e.target.password.value);
        const nickName = document.querySelector('#nickName');
        const password = document.querySelector('#password');
        nickName.value = '';
        password.value = '';
        
        // api 요청할 데이터 form 
        const delCommentObj = { nickName, password };
        handleClose();
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <CloseIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                    }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Box component="form" onSubmit={e=>delCom(e)}>
                        <TextField id='nickName' label="닉네임" inputProps={{maxLength: 8}} required/>
                        <TextField id='password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                        <Button onClick={handleClose}>닫기</Button>
                        <Button type="submit">삭제</Button>
                    </Box>
                </MenuItem>
            </Menu>
        </>
    );
}

// const Click = () => {
//     const [ anchorEl, setAnchorEl ] = useState(null);
//     const open = Boolean(anchorEl);

//     const handleClick = (e) => setAnchorEl(e.currentTarget);
//     const handleClose = () => setAnchorEl(null);
//     return (
//         <>
//         <Menu
//                     anchorEl={anchorEl}
//                     open={open}
//                     PaperProps={{
//                             elevation: 0,
//                             sx: {
//                                 overflow: 'visible',
//                                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                                 mt: 1.5,
//                                 '& .MuiAvatar-root': {
//                                 width: 32,
//                                 height: 32,
//                                 ml: -0.5,
//                                 mr: 1,
//                                 },
//                                 '&:before': {
//                                 content: '""',
//                                 display: 'block',
//                                 position: 'absolute',
//                                 top: 0,
//                                 right: 14,
//                                 width: 10,
//                                 height: 10,
//                                 bgcolor: 'background.paper',
//                                 transform: 'translateY(-50%) rotate(45deg)',
//                                 zIndex: 0,
//                                 },
//                             },
//                         }}
//                     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                     anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                 >
//                 </Menu>
//                 <MenuItem>
//                         hi
//                 </MenuItem>
//             </>
//     );
// }






const dataProcessing = (data) =>{ // 차트 데이터 가공
    let accEachAgeWoman=[];
    let accEachAgeMan=[];

    // if(data.part_Total===0)
    for (const key in data) {
        for (const childKey in data[key]) {
            switch(key){
                case "part_Age_Man":
                    accEachAgeMan.push(data[key][childKey]);
                    break;
                case "part_Age_Woman":
                    accEachAgeWoman.push(data[key][childKey]);
                    break;
                default: break;
            }
        }
    }
    const accAgeGenderData = [
        { "id" : "Woman", "data" : accEachAgeWoman.map((v, i)=> ({ 'x': `${i+1}0대`, 'y': accEachAgeWoman[5-i] })) },
        { "id" : "Man", "data" : accEachAgeMan.map((v, i)=> ({ 'x': `${i+1}0대`, 'y': accEachAgeMan[5-i] })) },
        { "id" : "Total", "data" : accEachAgeMan.map((v, i)=> ({ 'x': `${i+1}0대`, 'y': accEachAgeMan[5-i]+accEachAgeWoman[5-i]})) },
    ]
    const accAgeTotalData = accEachAgeMan.map((_, i)=>({ "id": `${i+1}0대`, "value": accEachAgeMan[5-i]+accEachAgeWoman[5-i] }));
    const accGenderTotalData = [
        { "id": "여성", "value": accEachAgeWoman.reduce((a,b)=>a+b), "color": "hsl(153, 70%, 50%)" },
        { "id": "남성", "value": accEachAgeMan.reduce((a,b)=>a+b), "color": "hsl(255, 70%, 50%)" },
    ]

    return [accAgeGenderData, accAgeTotalData, accGenderTotalData]
}