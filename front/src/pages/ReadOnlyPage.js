import React from 'react';
import SurveySubmitComp from '../components/survey/comp/SurveySubmitComp';

const ReadOnlyPage = (props) => {
    return (
        <>
            <SurveySubmitComp surveykey={props.match.params.surveykey} ReadOnlyState={true} UpdateKey={false} realReadState={true} />
        </>
    );
};

export default ReadOnlyPage;