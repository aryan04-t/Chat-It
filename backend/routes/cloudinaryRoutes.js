import express from 'express'; 
import { deleteCloudinaryAssetController } from '../controllers/cloudinaryControllers.js';

const router = express.Router(); 

router.post('/', deleteCloudinaryAssetController); 

export default router;