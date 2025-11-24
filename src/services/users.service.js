import bcrypt from "bcryptjs";
import { leerBD, guardarBD } from "../data/db.js";

const ruta = 'users';

export const getAllUsersData = async () => {
    const bd = leerBD();
    const users = bd[ruta] || [];
    return users.map(({ password, ...user }) => user);
};

export const getUserByIdData = async (id) => {
    const bd = leerBD();
    const users = bd[ruta] || [];
    const user = users.find(user => user.id === parseInt(id));
    if (user) {
        return { ...user, password: undefined };
    }
    return null;
};  

export const createUserData = async (userData) => {
    const { nombre, email, password, rol, ubicacion, experiencia } = userData;
    const bd = leerBD();
    const users = bd[ruta] || [];
    if (!nombre || !email || !password) {
        throw new Error('Nombre, email y password son obligatorios');
    } 
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1, 
        nombre, 
        email, 
        password: hashedPassword, 
        rol: rol || 'Sin asignar', 
        ubicacion : ubicacion || 'Desconocida', 
        experiencia: experiencia || 'No especificada'
    };

    users.push(newUser);
    bd[ruta] = users;
    guardarBD(bd);

    return { ...newUser, password: undefined };
};  

export const  updatedUserData = async (id, userData) => {
    const bd = leerBD();
    const users = bd[ruta] || [];
    const index = users.findIndex(user => user.id === Number(id));
    if (index === -1) return null;

    let newPassword = users[index].password;
    if (userData.password) {
        newPassword = await bcrypt.hash(userData.password, 10);
    }
    const updated = {
        id: users[index].id,
        nombre: userData.nombre || users[index].nombre,
        email: userData.email || users[index].email,
        password: newPassword,
        rol: userData.rol || users[index].rol,
        ubicacion: userData.ubicacion || users[index].ubicacion,
        experiencia: userData.experiencia || users[index].experiencia
    };

    users[index] = updated;
    bd[ruta] = users;
    guardarBD(bd);

    return { ...updated, password: undefined };
};  

export const deleteUserData = async (id) => {
    const bd = leerBD();
    const users = bd[ruta] || [];
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        bd[ruta] = users;
        guardarBD(bd);
        return true;
    }
    return false;
};      

export const verifyCredentials = async (email, password) => {
    const bd = leerBD();
    const users = bd[ruta] || [];
    const user = users.find(user => user.email === email);  
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }
    return { ...user, password: undefined };
};
