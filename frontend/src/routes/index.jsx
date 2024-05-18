import { createBrowserRouter } from 'react-router-dom'; 

import App from '../App';
import SignUpPage from '../pages/SignUpPage'; 
import CheckEmailLoginPage from '../pages/CheckEmailLoginPage';
import CheckPasswordLoginPage from '../pages/CheckPasswordLoginPage';
import Home from '../pages/Home'; 
import MessagePage from '../components/MessagePage'; 


const router = createBrowserRouter([

    {
        path : '/',
        element : <App />,
        children : [
            {
                path : 'signup', 
                element : <SignUpPage />
            },
            {
                path : 'email',
                element : <CheckEmailLoginPage />
            },
            {
                path : 'password',
                element : <CheckPasswordLoginPage /> 
            },
            {
                path : "",
                element : <Home />, 
                children : [
                    {
                        path : ':userId', 
                        element : <MessagePage />
                    }
                ]
            }
        ]
    }

]);


export default router; 