import e from 'express';
import { getAllUsersData, getUserByIdData, createUserData, deleteUserData, verifyCredentials, updatedUserData } 
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
        const status = error.status || 400;
        if (error.errors) {
            return res.status(status).json({ message: 'Error al crear usuario', errors: error.errors });
        }
        return res.status(status).json({ message: 'Error al crear usuario', error: error.message });
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
        const status = error.status || 500;
        return res.status(status).json({ message: `Error al eliminar el usuario con ID ${req.params.id}`, error: error.message });
    }
};

export const updatedUser = async (req, res) => {
    try {
        const updated = await updatedUserData(req.params.id, req.body);
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: `Usuario no encontrado con ID ${req.params.id}` });
        }
    } catch (error) {
        const status = error.status || 500;
        if (error.errors) {
            return res.status(status).json({ message: 'Error al actualizar usuario', errors: error.errors });
        }
        return res.status(status).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

export const pachtUser = async (req, res) => {
    try {
        const updated = await updatedUserData(req.params.id, req.body);
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: `Usuario no encontrado con ID ${req.params.id}` });
        }
    } catch (error) {
        const status = error.status || 500;
        if (error.errors) {
            return res.status(status).json({ message: 'Error al actualizar usuario', errors: error.errors });
        }
        return res.status(status).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

export const loginUser  = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await verifyCredentials(email, password);
        res.status(200).json({ msj: "Usuario verificado correctamente", user});
    } catch (error) {
        res.status(401).json({ message: 'Credenciales inválidas', error: error.message });
    }
};

