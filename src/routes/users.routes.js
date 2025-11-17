import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser} 
from '../controller/users.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;