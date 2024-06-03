import { logout } from '../redux/userSlice' 
import toast from 'react-hot-toast' 
import axios from 'axios' 


const performCompleteLogout = async (dispatch) => {
    try{
        dispatch(logout()); 
        await axios({
            method : 'get', 
            url : `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
            withCredentials : true 
        })
        localStorage.removeItem('token'); 
    }
    catch(err){
        toast.error(err?.response?.data?.message); 
        console.log(`Error occured while performing compete logout: ${err}`); 
    }
}

export default performCompleteLogout;