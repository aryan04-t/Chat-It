import express from 'express'; 
import {signup, checkEmailForLogin, checkPasswordAndLogin, logout} from '../controllers/authControllers.js';

const router = express.Router(); 


router.post('/signup', signup); 
router.post('/login/checkemail', checkEmailForLogin); 
router.post('/login/checkpassword', checkPasswordAndLogin); 
router.get('/logout', logout); 


export default router; 