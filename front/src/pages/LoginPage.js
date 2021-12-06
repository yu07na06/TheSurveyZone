import React from 'react';
import Footer from '../components/common/modules/Footer';
import Header from '../components/common/modules/Header';
import LoginComp from '../components/login/comp/LoginComp';

const LoginPage = () => {
    return (
        <>
            <Header />
                <LoginComp />
            <Footer />
        </>
    );
};

export default LoginPage;