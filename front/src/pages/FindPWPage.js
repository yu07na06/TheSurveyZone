import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
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