import express from 'express'; 

import protectRoute from '../middlewares/protectRoute.js';
import { getUserDetails, updateUserNameAndProfilePic } from '../controllers/userControllers.js'; 

const router = express.Router(); 


router.get('/details', protectRoute, getUserDetails); 
router.put('/update', protectRoute, updateUserNameAndProfilePic); 


export default router; 