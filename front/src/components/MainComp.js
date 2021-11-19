import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { chartData } from '../modules/chartReducer';
import Main from './Main';

const MainComp = () => {
    const data = useSelector(state=>state.chartReducer.responseAcc);
    const err = useSelector(state=>state.chartReducer.err);
    const dispatch = useDispatch();
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(()=>{
        dispatch(chartData());
    },[dispatch])

    useEffect(()=>{
        if(err !== null){
            Swal.fire({
                icon: 'error',
                title: '명백한 백잘못',
                text: err
            })
        }
    },[err])

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