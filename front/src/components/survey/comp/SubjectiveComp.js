import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitAction } from '../../../modules/submitReducer';
import Subjective from '../UI/Subjective';

const SubjectiveComp = ({ ReadOnlyState, ReadOnlyData, UpdateKey, realReadState, number, setCheck, setDelIndex, }) => {
    const [updateData, setUpdateData] = useState(ReadOnlyState ? ReadOnlyData.surQue_Content : null);
    const dispatch = useDispatch();

    const deleteQue = (e) => setDelIndex(e.target.id);

    useEffect(() => {
        if (ReadOnlyState)
            dispatch(submitAction({ [number]: `SurQueAnswer_${number}` }))
        
        setTimeout(() => {
            if (!ReadOnlyState || UpdateKey)
                setCheck({ [number]: [null] });
        }, 444)
    }, [])

    return (
        <>
            <Subjective
                ReadOnlyState={ReadOnlyState}
                ReadOnlyData={ReadOnlyData}
                UpdateKey={UpdateKey}
                realReadState={realReadState}
                number={number}
                updateData={updateData}
                setUpdateData={setUpdateData}
                deleteQue={deleteQue}
            />
        </>
    );
};

export default SubjectiveComp;