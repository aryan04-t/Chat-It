import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'; 

import App from '../App';
import SignUpPage from '../pages/SignUpPage'; 
import CheckEmailLoginPage from '../pages/CheckEmailLoginPage';
import CheckPasswordLoginPage from '../pages/CheckPasswordLoginPage';
import Home from '../pages/Home'; 
import MessagePage from '../components/MessagePage'; 
import AuthLayout from '../layouts/AuthLayout';
import ErrorPage from '../pages/ErrorPage';


// Routing using plain objects 
const router = createBrowserRouter([

    {
        path : '/',
        element : <App />,
        errorElement : <ErrorPage />,
        children : [
            {
                path : 'signup', 
                element : <AuthLayout> <SignUpPage /> </AuthLayout>,
                errorElement : <ErrorPage />
            },
            {
                path : 'login-email',
                element : <AuthLayout> <CheckEmailLoginPage /> </AuthLayout>,
                errorElement : <ErrorPage />
            },
            {
                path : 'login-password',
                element : <AuthLayout> <CheckPasswordLoginPage /> </AuthLayout>,
                errorElement : <ErrorPage />
            },
            {
                path : "",
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