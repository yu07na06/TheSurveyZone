import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
import FindIDComp from '../components/find/comp/FindIDComp';

const FindIDPage = () => {
    return (
        <>
            <Header />
                <FindIDComp />
            <Footer />
        </>
    );
};

export default FindIDPage;