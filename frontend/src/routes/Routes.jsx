import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'; 

import App from '../App';
import SignUpPage from '../pages/SignUpPage'; 
import CheckEmailLoginPage from '../pages/CheckEmailLoginPage';
import CheckPasswordLoginPage from '../pages/CheckPasswordLoginPage';
import Home from '../pages/Home'; 
import MessagePage from '../components/MessagePage'; 
import AuthLayout from '../layouts/AuthLayout';
import ErrorPage from '../pages/ErrorPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import GlobalToasterLayout from '../layouts/GlobalToasterLayout';


// Routing using plain objects 
const router = createBrowserRouter([
    {
        path : '/signup', 
        element : (
            <GlobalToasterLayout> 
                <AuthLayout> 
                    <SignUpPage /> 
                </AuthLayout> 
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage />
    },
    {
        path : '/login-email',
        element : (
            <GlobalToasterLayout> 
                <AuthLayout> 
                    <CheckEmailLoginPage /> 
                </AuthLayout> 
            </GlobalToasterLayout> 
        ),
        errorElement : <ErrorPage />
    },
    {
        path : '/login-password',
        element : (
            <GlobalToasterLayout>
                <AuthLayout> 
                    <CheckPasswordLoginPage /> 
                </AuthLayout>
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage />
    },
    {
        path : '/forgot-password',
        element : (
            <GlobalToasterLayout>
                <AuthLayout> 
                    <ChangePasswordPage /> 
                </AuthLayout>
            </GlobalToasterLayout>
        ), 
        errorElement : <ErrorPage />
    },
    {
        path : '/',
        element : (
            <GlobalToasterLayout> 
                <App /> 
            </GlobalToasterLayout>
        ),
        errorElement : <ErrorPage />,
        children : [
            {
                path : '/',
                element : <Home />,
                errorElement : <ErrorPage />,
                children : [
                    {
                        path : ':user-id', 
                        element : <MessagePage />,
                        errorElement : <ErrorPage />
                    }
                ]
            }
        ]
    }
]);


export default router; 