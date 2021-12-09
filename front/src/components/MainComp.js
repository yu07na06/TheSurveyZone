import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mainList as mainListAPI } from '../lib/api/home';
import { chartData } from '../modules/chartReducer';
import ErrorSweet from './common/modules/ErrorSweet';
import Main from './Main';
import { debounceText } from './common/debounceFunction';

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
                searchText={searchText}
                setSearchText={setSearchText}
             />      
        </>
    );
};

export default MainComp;










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