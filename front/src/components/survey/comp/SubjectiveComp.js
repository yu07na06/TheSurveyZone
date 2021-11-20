import React from 'react';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({number, setCheck, setDelIndex, ReadOnlyState, ReadOnlyData, }) => {

    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }
    
    !ReadOnlyState&&setCheck({[number]:[null]});

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