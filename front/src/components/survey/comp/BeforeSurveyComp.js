import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BeforeSurvey from '../UI/BeforeSurvey';

const BeforeSurveyComp = ({setAge,setSex }) => {
  const marks = [ { value: 10, label: '10대' }, { value: 20, label: '20대' }, { value: 30, label: '30대' }, { value: 40, label: '40대' }, { value: 50, label: '50대' }, { value: 60, label: '60대' } ];
  const sexAge = useSelector(state=>state.submitReducer.beforeData);

  useEffect(()=>{
    setAge(sexAge.age);
    setSex(sexAge.sex);
  },[])

  const addStore = (e) => {
    (e._reactName==='onChange')? setSex(e.target._wrapperState.initialValue) : setAge(e.target.value)
  }

  return (
    <>
        <BeforeSurvey 
            marks={marks}
            addStore={addStore}
        />
    </>
  );
};

export default BeforeSurveyComp;