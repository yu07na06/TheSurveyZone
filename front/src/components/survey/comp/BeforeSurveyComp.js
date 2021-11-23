import React from 'react';
import BeforeSurvey from '../UI/BeforeSurvey';
import { styled } from '@mui/material/styles';

const BeforeSurveyComp = ({setAge,setSex }) => {
    const marks = [
        {
          value: 10,
          label: '10대',
        },
        {
          value: 20,
          label: '20대',
        },
        {
          value: 30,
          label: '30대',
        },
        {
          value: 40,
          label: '40대',
        },
        {
          value: 50,
          label: '50대',
        },
        {
          value: 60,
          label: '60대',
        }
      ];
    
    const valuetext = (value) => {
        return `${value}`;
    }
    
    
    const Separator = styled('div')(
      ({ theme }) => `
      height: ${theme.spacing(3)};
      `,
    );
    
    // 성별, 나이 state에 저장
    const addStore = (e) => {
      (e._reactName==='onChange')?setSex(e.target._wrapperState.initialValue):setAge(e.target.value)
    }

    return (
        <>
            <BeforeSurvey 
                marks={marks}
                valuetext={valuetext}
                Separator={Separator}
                addStore={addStore}
            />
        </>
    );
};

export default BeforeSurveyComp;