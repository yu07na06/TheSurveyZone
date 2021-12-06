import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
import ResultComp from '../components/result/comp/ResultComp';

const ResultPage = (props) => {
    return (
        <>
            <Header />
                <ResultComp surveykey={props.match.params.surveykey} />
            <Footer />
        </>
    );
};

export default ResultPage;