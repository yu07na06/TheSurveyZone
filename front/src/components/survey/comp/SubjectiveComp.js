import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({ReadOnlyState, ReadOnlyData, setDelIndex, number, setCheck, UpdateKey, }) => {
    
    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        setTimeout(()=>{
            if(!ReadOnlyState||UpdateKey)
                setCheck({[number]:[null]});
        },444)
    },[])
    
    useEffect(()=>{
        if(ReadOnlyState)
            dispatch(submitAction(`SurQueAnswer_${number}`))
    },[])
    
    return (
        <>
            <Subjective
                deleteQue={deleteQue}
                number={number}
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                UpdateKey={UpdateKey}
            />
        </>
    );
};

export default SubjectiveComp;