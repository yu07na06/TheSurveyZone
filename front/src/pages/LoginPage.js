import React from 'react';
import Footer from '../components/common/UI/Footer';
import Header from '../components/common/UI/Header';
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