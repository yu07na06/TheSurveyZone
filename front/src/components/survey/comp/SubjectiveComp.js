import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, }) => {

    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }
    const dispatch = useDispatch();
    !ReadOnlyState&&setCheck({[number]:[null]});
    useEffect(()=>{
        if(ReadOnlyState)
            console.log("주관식은 여기서 디스패치 했다.", `SurQueAnswer_${number}`);
            dispatch(submitAction(`SurQueAnswer_${number}`))
            
    },[])
    return (
        <>
            <Subjective
                deleteQue={deleteQue}
                number={number}
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
            />
        </>
    );
};

export default SubjectiveComp;