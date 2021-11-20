import React from 'react';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({number, setCheck, setDelIndex}) => {

    const deleteQue = (e) => {
        setDelIndex(e.target.id);
    }
    
    setCheck({[number]:[null]});

    return (
        <>
            <Subjective
                deleteQue={deleteQue}
                number={number}
            />
        </>
    );
};

export default SubjectiveComp;