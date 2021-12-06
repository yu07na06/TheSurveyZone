import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { mainList as mainListAPI } from '../lib/api/home';
import { chartData } from '../modules/chartReducer';
import ErrorSweet from './common/modules/ErrorSweet';
import Main from './Main';

const MainComp = ({match}) => {
    const data = useSelector(state=>state.chartReducer.responseAcc);
    const err = useSelector(state=>state.chartReducer.err);
    const [ reqMain, setReqMain ] = useState(null);
    const [ alignment, setAlignment ] = useState(null);
    const [ pageNum, setPageNum ] = useState(1);
    const [ tagSearch, setTagSearch ] = useState('');
    const [ searchText, setSearchText ] = useState('');
    const TAGENUM = {};
    const dispatch = useDispatch();

    let accAgeGenderData = ""
    let accAgeTotalData = ""
    let accGenderTotalData = ""

    if(data.part_Age_Man&&data.part_Age_Woman){
    accAgeGenderData = 
    [
        {
            "id" : "Woman",
            "data" :  [
                { 'x': "10대", 'y': data.part_Age_Woman.age_10 },
                { 'x': "20대", 'y': data.part_Age_Woman.age_20 },
                { 'x': "30대", 'y': data.part_Age_Woman.age_30 },
                { 'x': "40대", 'y': data.part_Age_Woman.age_40 },
                { 'x': "50대", 'y': data.part_Age_Woman.age_50 },
                { 'x': "60대", 'y': data.part_Age_Woman.age_60 }
              ]
        },
        {
            "id" : "Man",
            "data" :  [
                { 'x': "10대", 'y': data.part_Age_Man['age_10'] },
                { 'x': "20대", 'y': data.part_Age_Man['age_20'] },
                { 'x': "30대", 'y': data.part_Age_Man['age_30'] },
                { 'x': "40대", 'y': data.part_Age_Man['age_40'] },
                { 'x': "50대", 'y': data.part_Age_Man['age_50'] },
                { 'x': "60대", 'y': data.part_Age_Man['age_60'] }
              ]
        },
        {
            "id" : "Total",
            "data" :  [
                { "x": "10대", "y": data.part_Age_Man.age_10+data.part_Age_Woman.age_10 },
                { "x": "20대", "y": data.part_Age_Man.age_20+data.part_Age_Woman.age_20 },
                { "x": "30대", "y": data.part_Age_Man.age_30+data.part_Age_Woman.age_30 },
                { "x": "40대", "y": data.part_Age_Man.age_40+data.part_Age_Woman.age_40 },
                { "x": "50대", "y": data.part_Age_Man.age_50+data.part_Age_Woman.age_50 },
                { "x": "60대", "y": data.part_Age_Man.age_60+data.part_Age_Woman.age_60 }
              ]
        }
    ]

    accAgeTotalData = [
        { "id": "10대", "vlaue": data.part_Age_Man.age_10+data.part_Age_Woman.age_10 },
        { "id": "20대", "value": data.part_Age_Man.age_20+data.part_Age_Woman.age_20 },
        { "id": "30대", "value": data.part_Age_Man.age_30+data.part_Age_Woman.age_30 },
        { "id": "40대", "value": data.part_Age_Man.age_40+data.part_Age_Woman.age_40 },
        { "id": "50대", "value": data.part_Age_Man.age_50+data.part_Age_Woman.age_50 },
        { "id": "60대", "value": data.part_Age_Man.age_60+data.part_Age_Woman.age_60 }
      ];


    accGenderTotalData = [
        { "id": "여성", "value": data.part_Age_Woman.age_10+data.part_Age_Woman.age_20+data.part_Age_Woman.age_30+data.part_Age_Woman.age_40+data.part_Age_Woman.age_50+data.part_Age_Woman.age_60, "color": "hsl(153, 70%, 50%)" },
        { "id": "남성", "value": data.part_Age_Man.age_10+data.part_Age_Man.age_20+data.part_Age_Man.age_30+data.part_Age_Man.age_40+data.part_Age_Man.age_50+data.part_Age_Man.age_60, "color": "hsl(255, 70%, 50%)" },
    ];

    }

    
    
    for (const value of data.sur_Tag) { // 태그 enum으로 사용하기
        TAGENUM[value.tag_ID] = value.tag_Name;
    }

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
        console.log('이거 되니');
        setPageNum(1);
        setTagSearch('');
        setSearchText('');
    },[dispatch, match.params]);

    // main 리스트, 태그, 검색 요청
    useEffect(()=>{
        dispatch(chartData());
        if(pageNum===undefined || tagSearch===undefined || searchText===undefined) return;
        mainListAPI(pageNum, tagSearch, searchText)
            .then(res => setReqMain(res.data))
            .catch(err => ErrorSweet(err.response.status, err.response.statusText, err.response.data.message))
    },[pageNum, tagSearch, searchText])

    const pageChange = page => setPageNum(page);

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
                alignment={alignment}
                setAlignment={setAlignment}
                pageNum={pageNum}
                pageChange={pageChange}
                setSearchText={setSearchText}
                searchText={searchText}
             />      
        </>
    );
};

export default MainComp;