import React from 'react';
import SurveySubmitComp from '../components/survey/comp/SurveySubmitComp';

const SurveySubmitPage = (props) => {
    return (
        <>
            <SurveySubmitComp surveykey={props.match.params.surveykey} UpdateKey={false} realReadState={false}/>
        </>
    );
};

export default SurveySubmitPage;