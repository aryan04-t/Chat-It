import express from 'express'; 

import protectRoute from '../middlewares/protectRoute.js';
import { getUserDetails, updateUserNameAndProfilePic } from '../controllers/userControllers.js'; 

const router = express.Router(); 


router.get('/', protectRoute, getUserDetails); 
router.put('/update-user', protectRoute, updateUserNameAndProfilePic); 


export default router; 