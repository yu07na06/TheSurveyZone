import React from 'react';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({number, setCheck}) => {
    setCheck({[number]:[null]});
    return (
        <>
            <Subjective
                number={number}
            />
        </>
    );
};

export default SubjectiveComp;