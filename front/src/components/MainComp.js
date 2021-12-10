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
import { Button, Grid, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import Modal from '@mui/material/Modal';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import { Gongback } from './common/Function';



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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export const Comment = () => {
    const [ commentList, setCommentList ] = useState([]);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const addCom = (e) => {
        e.preventDefault();
        console.log(e.target.com_Nickname.value);
        console.log(e.target.com_Password.value);
        console.log(e.target.com_Context.value);
        setCommentList([...commentList, e.target.com_Context.value ]);
        
        const com_Nickname = document.querySelector('#com_Nickname');
        const com_Password = document.querySelector('#com_Password');
        const com_Context = document.querySelector('#com_Context');
        com_Nickname.value = '';
        com_Password.value = '';
        com_Context.value = '';

        // api 요청할 데이터 form 
        const commentObj = {com_Nickname, com_Password, com_Context };

    }

    const textEdit = (e) => {

    }



    return(
        <>
            <Tooltip title="QRcode 생성">
                <IconButton onClick={handleClick} size="small">
                    <CommentIcon color="action" />
                </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper sx={{ height: 400, width: 400 }} >
                        <Grid container spacing={2}>
                            {commentList.map((v, i)=>
                                <>
                                    <Grid item xs={9}>
                                        <Typography>{`${v} : ${v}`}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ModifyComment text={v}/>
                                        <DelComment id={i}/>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Paper>
                    <Gongback num={1}/>

                    <Box component="form" onSubmit={e=>addCom(e)}>
                        <TextField id='com_Nickname' label="닉네임" inputProps={{maxLength: 8}} required/>
                        <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                        <TextField id='com_Context' fullWidth label="입력란" inputProps={{maxLength: 30}} required/>
                        <Button type="submit">댓글달기</Button>
                    </Box>
                    <Button onClick={handleClose}>닫기</Button>
                </Box>
            </Modal>
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
        console.log(e.target.com_Password.value);
        const com_Password = document.querySelector('#com_Password');
        com_Password.value = '';
        
        // api 요청할 데이터 form 
        const delCommentObj = { com_Password };
        handleClose();
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <CloseIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
            <Box component="form" onSubmit={e=>delCom(e)} sx={style}>
                <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                <Button onClick={handleClose}>닫기</Button>
                <Button type="submit">삭제</Button>
            </Box>

            </Modal>
        </>
    );
}

export const ModifyComment = ({ text }) => {
    const [modiText, setModiText] = useState(text);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const modiCom = (e) => {
        e.preventDefault();
        console.log(modiText);
        
        // api 요청할 데이터 form 
        const modiCommentObj = { modiText };
        // handleClose();
        // 혹시 수정하고 api요청 안하고 닫기 눌렀을 경우를 대비해서 state 초기화
        setModiText(text)
    }

    return(
        <>
            <IconButton onClick={handleClick} size="small">
                <ModeEditOutlineTwoToneIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
            <Box component="form" onSubmit={e=>modiCom(e)} sx={style}>
                <TextField id='com_Password' onChange={e=>setModiText(e.target.value)} value={modiText} label="댓글" inputProps={{maxLength: 30}} required/><br/>
                <TextField id='com_Password' type='password' label="비밀번호" inputProps={{maxLength: 8}} required/><br/>
                <Button onClick={handleClose}>닫기</Button>
                <Button type="submit">수정</Button>
            </Box>

            </Modal>
        </>
    );
}





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