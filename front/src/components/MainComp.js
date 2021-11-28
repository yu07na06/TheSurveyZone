import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { mainList as mainListAPI, mainListPage as mainListPageAPI } from '../lib/api/home';
import { chartData } from '../modules/chartReducer';
import Main from './Main';

const MainComp = () => {
    const data = useSelector(state=>state.chartReducer.responseAcc);
    const err = useSelector(state=>state.chartReducer.err);
    const [ reqMain, setReqMain ] = useState(null);
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
    },[dispatch]);

    // main 리스트 요청
    useEffect(()=>{
        mainListAPI()
            .then( res => setReqMain(res.data) )
            .catch( error => console.log("메인 리스트 요청 오류", error) )
    },[dispatch]);

    // 페이징 요청
    const callPage = (page_Num) => {
        mainListPageAPI(page_Num)
            .then(res => setReqMain(res.data))
            .catch(err => console.log("메인 페이지 요청 오류", err));
    }

    return (
        <>
            <Main
                data={data}
                accUserData={accUserData}
                accAgeData={accAgeData}
                accSexData={accSexData}
                reqMain={reqMain}
                callPage={callPage}
                TAGENUM={TAGENUM}
             />      
        </>
    );
};

export default MainComp;