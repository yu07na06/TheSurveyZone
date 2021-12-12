import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import FindPWComp from '../components/find/comp/FindPWComp';

const FindPWPage = () => {
    return (
        <>
            <Header />
                <FindPWComp />
            <Footer />
        </>
    );
};

export default FindPWPage;