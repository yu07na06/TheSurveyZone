import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
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