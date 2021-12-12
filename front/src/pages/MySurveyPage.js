import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import MySurveyComp from '../components/survey/comp/MySurveyComp';

const MySurveyPage = () => {
    return (
        <>
            <Header />
                <MySurveyComp />
            <Footer />
        </>
    );
};

export default MySurveyPage;