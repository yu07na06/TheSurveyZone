import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({ReadOnlyState, ReadOnlyData, setDelIndex, number, setCheck, UpdateKey, realReadState}) => {
    const dispatch = useDispatch();
    
    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(!ReadOnlyState||UpdateKey)
                setCheck({[number]:[null]});
        },444)
    },[])
    
    useEffect(()=>{
        if(ReadOnlyState)
            dispatch(submitAction({[number]:`SurQueAnswer_${number}`}))
    },[])
    
    return (
        <>
            <Subjective
                deleteQue={deleteQue}
                number={number}
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                UpdateKey={UpdateKey}
                realReadState={realReadState}
            />
        </>
    );
};

export default SubjectiveComp;