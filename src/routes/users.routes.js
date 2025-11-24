import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, loginUser, updatedUser} from '../controller/users.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.put('/:id', updatedUser);

export default router;