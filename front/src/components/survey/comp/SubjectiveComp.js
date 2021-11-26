import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, UpdateKey, }) => {
    
    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }

    const dispatch = useDispatch();
    !ReadOnlyState&&setCheck({[number]:[null]});
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