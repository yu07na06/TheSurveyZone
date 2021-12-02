import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import CreateSurveyComp from '../components/survey/comp/CreateSurveyComp';

const CreateSurveyPage = () => {
    return (
        <>
            <Header />
                <CreateSurveyComp />
            <Footer />
        </>
    );
};

export default CreateSurveyPage;