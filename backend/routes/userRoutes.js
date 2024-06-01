import express from 'express'; 

import protectRoute from '../middlewares/protectRoute.js';
import { getUserDetails, updateUserNameAndProfilePic, getAllMatchingUsers } from '../controllers/userControllers.js'; 

const router = express.Router(); 


router.get('/details', protectRoute, getUserDetails); 
router.put('/update', protectRoute, updateUserNameAndProfilePic); 
router.put('/get-user-search-result', protectRoute, getAllMatchingUsers); 


export default router; 