import React from 'react';
import ResultComp from '../components/result/comp/ResultComp';

const ResultPage = (props) => {
    return (
        <>
            <ResultComp surveykey={props.match.params.surveykey} />
        </>
    );
};

export default ResultPage;