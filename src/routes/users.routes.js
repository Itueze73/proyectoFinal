import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, loginUser,updatedUser, pachtUser } from '../controller/users.controller.js';
import { authJWT, ckeckAdminRole } from '../middleware/authJWT.js';

const router = Router();

router.get('/', authJWT, getAllUsers);
router.get('/:id', authJWT, getUserById);
router.post('/', createUser);
router.post('/login', loginUser);
router.delete('/:id', authJWT, ckeckAdminRole, deleteUser);
router.put('/:id', authJWT,  updatedUser);
router.patch('/:id', authJWT,  pachtUser);

export default router;