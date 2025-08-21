import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <div>
            {isLogin ? <LoginForm toggleForm={toggleForm} /> : <RegisterForm toggleForm={toggleForm} />}
        </div>
    );
};

export default AuthContainer;