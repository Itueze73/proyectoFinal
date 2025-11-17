import { getAllUsersData, getUserByIdData, createUserData, deleteUserData } 
from '../services/users.service.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersData();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error obtener usuarios', error: error.message });
    }
};  

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdData(id); 
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `Usuario no encontrado con ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error al obtener el usuario con ID ${id}`, error: error.message });
    }

};

export const createUser = async (req, res) => {
    try {
        const newUser = await createUserData(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear usuario', error: error.message });
    }
};  

export const deleteUser = async (req, res) => {
    try {
         const deleted = await deleteUserData(req.params.id);
        if (deleted) {
            res.status(200).json({ message: `Usuario eliminado correctamente con ID ${req.params.id}` });
        } else {
            res.status(404).json({ message: `Usuario no encontrado con ID ${req.params.id}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar el usuario con ID ${req.params.id}`, error: error.message });
    }
};



