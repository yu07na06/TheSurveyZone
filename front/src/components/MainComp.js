import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { mainList as mainListAPI } from '../lib/api/home';
import { chartData } from '../modules/chartReducer';
import Main from './Main';

const MainComp = () => {
    const data = useSelector(state=>state.chartReducer.responseAcc);
    const err = useSelector(state=>state.chartReducer.err);
    const dispatch = useDispatch();
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // useEffect(()=>{
    //     console.log("잘들어왔나", data);
    // },[data])

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
            .then(res=>console.log("리스트 요청 값", res))
            .catch(error => console.log("리스트 오류", error))
    },[dispatch]);

    return (
        <>
            <Main
                cards={cards}
                data={data}
             />      
        </>
    );
};

export default MainComp;