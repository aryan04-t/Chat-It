import express from 'express'; 

import protectRoute from '../middlewares/protectRoute.js';
import { getUserDetails } from '../controllers/userControllers.js'; 

const router = express.Router(); 


router.get('/', protectRoute, getUserDetails); 


export default router; 