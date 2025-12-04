import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { ProductModel } from "../models/products.model.js";

const ruta = 'products';

function validateProductData(rawBody, options = { partial: false }) {
    const partial = Boolean(options.partial);
    const errors = [];
    const normalizedData = {};

    const nombre = rawBody.nombre ?? rawBody.name;
    if (nombre !== undefined) {
        if (nombre == null || typeof nombre !== 'string' || nombre.trim() === '') {
            errors.push('El nombre debe ser un texto válido');
        } else {
            normalizedData.nombre = nombre.trim();
        }
    } else if (!partial) {
        errors.push('El nombre es obligatorio y debe ser un texto válido');
    }

    const rawPrecio = rawBody.precio ?? rawBody.price;
    if (rawPrecio !== undefined) {
        // En modo parcial aceptamos strings numéricos, en modo completo solo números
        const precio = (typeof rawPrecio === 'number') ? rawPrecio : (typeof rawPrecio === 'string' ? (rawPrecio.trim() === '' ? NaN : Number(rawPrecio)) : NaN);
        if (Number.isNaN(precio)) {
            errors.push('El precio debe ser un número');
        } else if (precio <= 0) {
            errors.push('El precio debe ser un número mayor a 0');
        } else {
            normalizedData.precio = precio;
        }
    } else if (!partial) {
        errors.push('El precio es obligatorio y debe ser un número');
    }

    const rawStock = rawBody.stock;
    if (rawStock !== undefined) {
        const stock = (typeof rawStock === 'number') ? rawStock : (typeof rawStock === 'string' ? (rawStock.trim() === '' ? NaN : Number(rawStock)) : NaN);
        if (Number.isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
            errors.push('El stock debe ser un número entero mayor o igual a 0');
        } else {
            normalizedData.stock = stock;
        }
    } else if (!partial) {
        errors.push('El stock es obligatorio y debe ser un número entero mayor o igual a 0');
    }

    const rawCategoria = rawBody.categoria ?? rawBody.category;
    const rawDescripcion = rawBody.descripcion ?? rawBody.description;
    if (rawDescripcion !== undefined && rawDescripcion !== null) {
        if (typeof rawDescripcion !== 'string') {
            errors.push('Si envías descripcion, debe ser texto');
        } else {
            normalizedData.descripcion = String(rawDescripcion).trim();
        }
    }
    if (rawCategoria !== undefined && rawCategoria !== null) {
        if (typeof rawCategoria !== 'string' || rawCategoria.trim() === '') {
            errors.push('Si envías una categoría, debe ser texto válido');
        } else {
            normalizedData.categoria = rawCategoria.trim();
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        normalizedData
    };
}

export const getAllProductsData = async () => {
    const products = collection(db, ruta);
    const snapshot = await getDocs(products);
    if  (snapshot.empty) {
        return [];
    }
        return snapshot.docs.map(d => {
            const data = d.data();
            return new ProductModel(d.id, data.nombre, data.descripcion, data.precio, data.categoria, data.stock);
        });
};

export const getProductByIdData = async (id) => {
    const docRef = doc(db, ruta, String(id));
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
        const data = snapshot.data();
        return new ProductModel(snapshot.id, data.nombre, data.descripcion, data.precio, data.categoria, data.stock);
};  

export const createProductData = async (productData) => {
   
    const validation = validateProductData(productData);
    
    if (!validation.isValid) {
        const error = new Error(validation.errors.join('; '));
        error.status = 400;
        error.errors = validation.errors;
        throw error;
    }

    const payload = {
        ...validation.normalizedData
    };

    const productsCollection = collection(db, ruta);
    const docRef = await addDoc(productsCollection, payload);
    const newDoc = await getDoc(docRef);
        const data = newDoc.data();
        return new ProductModel(newDoc.id, data.nombre, data.descripcion, data.precio, data.categoria, data.stock);
};

export const updateProductData = async (id, productData) => {
    const docRef = doc(db, ruta, String(id));
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;

    const validacion = validateProductData(productData);
    if (!validacion.isValid) {
        const error = new Error(validacion.errors.join('; '));
        error.status = 400;
        error.errors = validacion.errors;
        throw error;
    }   
   
    const updatedData = { ...validacion.normalizedData };
    await updateDoc(docRef, updatedData);
    const updatedSnap = await getDoc(docRef);
        const data = updatedSnap.data();
        return new ProductModel(updatedSnap.id, data.nombre, data.descripcion, data.precio, data.categoria, data.stock);
};

export const patchProductData = async (id, partialData) => {
    const docRef = doc(db, ruta, String(id));
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    // Reutilizar la validación en modo parcial
    const validation = validateProductData(partialData, { partial: true });
    if (!validation.isValid) {
        const err = new Error(validation.errors.join('; '));
        err.status = 400;
        err.errors = validation.errors;
        throw err;
    }

    const updates = { ...validation.normalizedData };
    // Si no hay campos a actualizar, devolver error
    if (Object.keys(updates).length === 0) {
        const err = new Error('No se enviaron campos para actualizar');
        err.status = 400;
        err.errors = ['No se enviaron campos para actualizar'];
        throw err;
    }

    // aplicar cambios parciales
    await updateDoc(docRef, updates);
    const updatedSnap = await getDoc(docRef);
        const data = updatedSnap.data();
        return new ProductModel(updatedSnap.id, data.nombre, data.descripcion, data.precio, data.categoria, data.stock);
};

export const deleteProductData = async (id) => {
    const docRef = doc(db, ruta, String(id));
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return false;
    await deleteDoc(docRef);
    return true;
};  

