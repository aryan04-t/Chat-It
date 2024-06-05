import toast from 'react-hot-toast';
import { logout } from '../redux/userSlice' 
import axios from 'axios'

const intentionalLogoutOnUserRequest = (dispatch) => {
    axios({
        method : 'get', 
        url : `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, 
        withCredentials : true 
    }) 
    .then( (res) => {
        if(res?.data?.success){
            toast.success(res?.data?.message); 
            dispatch(logout()); 
            localStorage.removeItem('jwt');   
        }
    }) 
    .catch( (err) => {
        toast.error(err?.response?.data?.message); 
        console.log(`Error occured while performing compete logout: ${err}`); 
    }) 
}

export default intentionalLogoutOnUserRequest;