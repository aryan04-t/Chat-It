import express from 'express'; 
import {signup, checkEmail, checkPassword} from '../controllers/authControllers.js';

const router = express.Router(); 


router.post('/signup', signup); 
router.post('/login/checkemail', checkEmail); 
router.post('/login/checkpassword', checkPassword); 


export default router; 