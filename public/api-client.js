// Cliente simple para consumir la API desde las páginas estáticas
// Usa rutas relativas: /api/users y /api/products

const baseUsers = '/api/users';
const baseProducts = '/api/products';

export function getToken() {
    return localStorage.getItem('token') || null;
}

export function setToken(token) {
    if (token) localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

function authHeaders() {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function request(method, url, body = undefined, withAuth = false) {
    const headers = { ... (body ? { 'Content-Type': 'application/json' } : {}), ...(withAuth ? authHeaders() : {}) };
    const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });
    const text = await res.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch (err) {
        data = text;
    }
    if (!res.ok) {
        const error = new Error(data && data.message ? data.message : `Request failed: ${res.status}`);
        error.response = data;
        throw error;
    }
    // Desestructurar respuestas que vienen en { status, data }
    if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'data')) {
        return data.data;
    }
    return data;
}

// Users
export const api = {
    // Users
    createUser: (payload) => request('POST', baseUsers, payload, false),
    login: (payload) => request('POST', `${baseUsers}/login`, payload, false),
    getAllUsers: () => request('GET', baseUsers, undefined, true),
    getUserById: (id) => request('GET', `${baseUsers}/${id}`, undefined, true),
    putUser: (id, payload) => request('PUT', `${baseUsers}/${id}`, payload, true),
    patchUser: (id, payload) => request('PATCH', `${baseUsers}/${id}`, payload, true),
    deleteUser: (id) => request('DELETE', `${baseUsers}/${id}`, undefined, true),
    // Products
    getAllProducts: () => request('GET', baseProducts, undefined, false),
    getProductById: (id) => request('GET', `${baseProducts}/${id}`, undefined, false),
    createProduct: (payload) => request('POST', baseProducts, payload, false),
    putProduct: (id, payload) => request('PUT', `${baseProducts}/${id}`, payload, false),
    patchProduct: (id, payload) => request('PATCH', `${baseProducts}/${id}`, payload, false),
    deleteProduct: (id) => request('DELETE', `${baseProducts}/${id}`, undefined, false),
};

// Helper para mostrar respuesta bonita
export function pretty(data) {
    return JSON.stringify(data, null, 2);
}