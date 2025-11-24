import { leerBD, guardarBD } from "../data/db.js";
const ruta = 'products';

export const getAllProductsData = async () => {
    const bd = leerBD();
    const products = bd[ruta] || [];
    return products;
};

export const getProductByIdData = async (id) => {
    const bd = leerBD();
    const products = bd[ruta] || [];
    return products.find(product => product.id === parseInt(id));
};  

// Función para validar los datos del producto
function validateProductData(rawBody) {
    const errors = [];
    const normalizedData = {};

    // Normalizar nombre (soporta 'name' o 'nombre')
    const nombre = rawBody.nombre ?? rawBody.name;
    if (nombre == null || typeof nombre !== 'string' || nombre.trim() === '') {
        errors.push('El nombre es obligatorio y debe ser un texto válido');
    } else {
        normalizedData.nombre = nombre.trim();
    }

    // Precio: exigir tipo number (no aceptar strings)
    const rawPrecio = rawBody.precio ?? rawBody.price;
    if (rawPrecio === undefined || rawPrecio === null) {
        errors.push('El precio es obligatorio y debe ser un número');
    } else if (typeof rawPrecio !== 'number' || Number.isNaN(rawPrecio)) {
        errors.push('El precio debe ser un número');
    } else if (rawPrecio <= 0) {
        errors.push('El precio debe ser un número mayor a 0');
    } else {
        normalizedData.precio = rawPrecio;
    }

        // Stock obligatorio para creación (POST): debe ser número entero >= 0
        const rawStock = rawBody.stock;
        if (rawStock === undefined || rawStock === null) {
            errors.push('El stock es obligatorio y debe ser un número entero mayor o igual a 0');
        } else if (typeof rawStock !== 'number' || Number.isNaN(rawStock) || !Number.isInteger(rawStock) || rawStock < 0) {
            errors.push('El stock debe ser un número entero mayor o igual a 0');
        } else {
            normalizedData.stock = rawStock;
        }

    // Normalizar categoría (opcional)
    const rawCategoria = rawBody.categoria ?? rawBody.category;
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

export const createProductData = async (productData) => {
    // Validar datos
    const validation = validateProductData(productData);
    
    if (!validation.isValid) {
        const error = new Error(validation.errors.join('; '));
        error.status = 400;
        error.errors = validation.errors;
        throw error;
    }

    const bd = leerBD();
    const products = bd[ruta] || [];
    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        ...validation.normalizedData
    };
    
    products.push(newProduct);
    bd[ruta] = products;
    guardarBD(bd);
    return newProduct;
};

export const updateProductData = async (id, productData) => {
    const bd = leerBD();
    const products = bd[ruta] || [];

    const validacion = validateProductData(productData);
    if (!validacion.isValid) {
        const error = new Error(validacion.errors.join('; '));
        error.status = 400;
        error.errors = validacion.errors;
        throw error;
    }   
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) return null;
    const updated = {
        id: products[index].id,
        ...validacion.normalizedData
    };

    products[index] = updated;
    bd[ruta] = products;
    guardarBD(bd);
    return updated;
};

export const deleteProductData = async (id) => {
    const bd = leerBD();
    const products = bd[ruta] || [];
    
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
        products.splice(index, 1);
       
        bd[ruta] = products;
        guardarBD(bd);
        return true;
    }
    return false;
};  

