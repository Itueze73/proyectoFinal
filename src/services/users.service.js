import bcrypt from "bcryptjs";
import { collection, getDocs, addDoc, query, where, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

const ruta = 'users';

export const getAllUsersData = async () => {
    const snapshot = await getDocs(collection(db, ruta));
    return snapshot.docs.map(d => {
        const { password, ...rest } = d.data();
        return { id: d.id, ...rest };
    });
};

export const getUserByIdData = async (id) => {
    const docRef = doc(db, ruta, String(id));
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    const { password, ...rest } = snapshot.data();
    return { id: snapshot.id, ...rest };
};  

export const createUserData = async (userData) => {
    const { nombre, email, password, rol, ubicacion, experiencia } = userData;
    
    if (!nombre || !email || !password) {
        const err = new Error('Nombre, email y password son obligatorios');
        err.status = 400;
        throw err;
    }
    
    const q = query(collection(db, ruta), where('email', '==', String(email).toLowerCase()));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
        const err = new Error('El email ya está registrado');
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
        nombre: String(nombre).trim(),
        email: String(email).trim().toLowerCase(),
        password: hashedPassword,
        rol: rol || 'Sin asignar',
        ubicacion: ubicacion || 'Desconocida',
        experiencia: experiencia || 'No especificada'
    };

    const docRef = await addDoc(collection(db, ruta), payload);
    return { id: docRef.id, ...payload, password: undefined };
};  

export const  updatedUserData = async (id, userData) => {
    const docRef = doc(db, ruta, String(id));
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;

    if (userData.email) {
        const q = query(collection(db, ruta), where('email', '==', String(userData.email).toLowerCase()));
        const found = await getDocs(q);
        if (!found.empty) {
            const other = found.docs.find(d => d.id !== String(id));
            if (other) {
                const err = new Error('El email ya está registrado por otro usuario');
                err.status = 409;
                throw err;
            }
        }
    }

    const updates = {};
    if (userData.nombre !== undefined) updates.nombre = String(userData.nombre).trim();
    if (userData.email !== undefined) updates.email = String(userData.email).trim().toLowerCase();
    if (userData.password !== undefined) updates.password = await bcrypt.hash(userData.password, 10);
    if (userData.rol !== undefined) updates.rol = userData.rol;
    if (userData.ubicacion !== undefined) updates.ubicacion = userData.ubicacion;
    if (userData.experiencia !== undefined) updates.experiencia = userData.experiencia;

    await updateDoc(docRef, updates);
    const updatedSnap = await getDoc(docRef);
    const { password, ...rest } = updatedSnap.data();
    return { id: updatedSnap.id, ...rest };
};  

export const pachtUserData = async (id, partialData) => {
    return updatedUserData(id, partialData);

};

export const deleteUserData = async (id) => {
    const docRef = doc(db, ruta, String(id));
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return false;
    await deleteDoc(docRef);
    return true;
};      

export const verifyCredentials = async (email, password) => {
    const q = query(collection(db, ruta), where('email', '==', String(email).toLowerCase()));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        throw new Error('Usuario no encontrado');
    }

    const docSnap = snapshot.docs[0];
    const userData = docSnap.data();
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    const { password: pwd, ...rest } = userData;
    return { id: docSnap.id, ...rest };
};
