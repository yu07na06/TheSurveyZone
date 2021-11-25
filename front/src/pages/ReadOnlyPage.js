import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import ReadOnlyComp from '../components/survey/comp/ReadOnlyComp';

const ReadOnlyPage = () => {
    return (
        <>
            <Header />
                <ReadOnlyComp />
            <Footer />
        </>
    );
};

export default ReadOnlyPage;