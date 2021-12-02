import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { mainList as mainListAPI } from '../lib/api/home';
import { chartData } from '../modules/chartReducer';
import { useStyles } from './common/UI/Header';
import Main from './Main';

const MainComp = ({match}) => {
    const data = useSelector(state=>state.chartReducer.responseAcc);
    const err = useSelector(state=>state.chartReducer.err);
    const [ reqMain, setReqMain ] = useState(null);
    const [ alignment, setAlignment ] = useState(null);
    const [ pageNum, setPageNum ] = useState(1);
    const [ tagSearch, setTagSearch ] = useState('');
    const [ searchText, setSearchText ] = useState(null);
    const classes = useStyles();
    const TAGENUM = {};
    const dispatch = useDispatch();

    const accUserData = [ 
        ['day', 'people'],
        ['18일', 3],
        ['19일', 8],
        ['20일', 9],
        ['21일', 10],
        ['22일', 12],
        ['23일', data.part_Total],
    ];

    const accAgeData = [
        ['연령', '연령수'],
        ['10대', data.part_Age.age_10],
        ['20대', data.part_Age.age_20],
        ['30대', data.part_Age.age_30],
        ['40대', data.part_Age.age_40],
        ['50대', data.part_Age.age_50],
        ['60대', data.part_Age.age_60],
    ];

    for (const value of data.sur_Tag) { // 태그 enum으로 사용하기
        TAGENUM[value.tag_ID] = value.tag_Name;
    }

    const accSexData = [
        ['성별', '성별수'],
        ['여성', data.part_Gender.woman],
        ['남성', data.part_Gender.man],
    ];

    useEffect(()=>{
        if(err !== null){
            Swal.fire({
                icon: 'error',
                title: '명백한 백잘못',
                text: err
            })
        }
    },[err]);

    // main 차트 요청
    useEffect(()=>{
        dispatch(chartData());
        setPageNum(1);
        setTagSearch('');
        setSearchText('');
    },[dispatch, match.params]);
    
    // main 리스트, 태그, 검색 요청
    useEffect(()=>{
        mainListAPI(pageNum, tagSearch, searchText)
            .then(res => setReqMain(res.data))
            .catch(error => console.log("메인 오류", error))
    },[pageNum, tagSearch, searchText])

    mainListAPI(); // 이게 있어야할 것 같긴 한데,, 확인 부탁

    const pageChange = page => setPageNum(page);

    // const newData = []
    // for (const value of accAgeData) {
    //     if(value[0]==="연령") continue;
    //     newData.push({ age:value[0], people:value[1] })
    // }
    // console.log("newData", newData);

    return (
        <>
            <Main
                data={data}
                accUserData={accUserData}
                accAgeData={accAgeData}
                accSexData={accSexData}
                reqMain={reqMain}
                TAGENUM={TAGENUM}
                setTagSearch={setTagSearch}
                tagSearch={tagSearch}
                alignment={alignment}
                setAlignment={setAlignment}
                pageNum={pageNum}
                pageChange={pageChange}
                setSearchText={setSearchText}
                classes={classes}
                // newData={newData}
             />      
        </>
    );
};

export default MainComp;