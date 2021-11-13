import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import CreateSurveyConmp from '../components/survey/comp/CreateSurveyComp';

const CreateSurveyPage = () => {
    return (
        <>
            <Header />
                <CreateSurveyConmp />
            <Footer />
        </>
    );
};

export default CreateSurveyPage;