import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, loginUser,updatedUser, pachtUser } from '../controller/users.controller.js';
import { authJWT, ckeckAdminRole } from '../middleware/authJWT.js';

const router = Router();

router.get('/', authJWT, ckeckAdminRole, getAllUsers);
router.get('/:id', authJWT, ckeckAdminRole, getUserById);
router.post('/', createUser);
router.post('/login', loginUser);
router.delete('/:id', authJWT, ckeckAdminRole, deleteUser);
router.put('/:id', authJWT, ckeckAdminRole, updatedUser);
router.patch('/:id', authJWT, ckeckAdminRole, pachtUser);

export default router;