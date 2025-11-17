
const products = [
    { id: 1, nombre: 'Laptop', precio: 1200, descripcion: 'Laptop de alta gama' },
    { id: 2, nombre: 'Mouse', precio: 25, descripcion: 'Mouse inalámbrico' },
    { id: 3, nombre: 'Teclado', precio: 75, descripcion: 'Teclado mecánico' }
];

export const getAllProductsData = async () => products;

export const getProductByIdData = async (id) => {
    return products.find(product => product.id === parseInt(id));
};  

export const createProductData = async (productData) => {
    const newProduct = {
        id: products.length + 1,
        ...productData
    };
    products.push(newProduct);
    return newProduct;
};

export const deleteProductData = async (id) => {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
};  

