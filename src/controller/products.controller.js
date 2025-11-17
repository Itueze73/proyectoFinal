import { getAllProductsData, getProductByIdData, createProductData, deleteProductData } from '../services/products.service.js';

export const getAllProducts = async (req, res) => {         
    try {
        const products = await getAllProductsData();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};  

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;  
        const product = await getProductByIdData(id); 
        if (product) {
            res.status(200).json(product);          
        } else {
            res.status(404).json({ message: `Producto no encontrado por ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error: error.message });
    }
};  

export const createProduct = async (req, res) => {
  try {
    // Mapea alias: acepta nombre/name y precio/price
    const rawBody = req.body || {};
    const nombre = rawBody.nombre ?? rawBody.name;
    const rawPrecio = rawBody.precio ?? rawBody.price;
    const descripcion = rawBody.descripcion ?? rawBody.description;

    // normalizar precio: puede venir como "3000"
    const precio = typeof rawPrecio === 'string'
      ? (rawPrecio.trim() === '' ? null : Number(rawPrecio))
      : rawPrecio;

    // Validación secuencial: devolver sólo el primer error
    if (nombre == null || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({
        field: 'nombre',
        message: 'El nombre es obligatorio y debe ser un texto válido'
      });
    }

    if (precio == null || Number.isNaN(precio)) {
      return res.status(400).json({
        field: 'precio',
        message: 'El precio es obligatorio y debe ser un número'
      });
    }

    if (typeof precio !== 'number' || precio <= 0) {
      return res.status(400).json({
        field: 'precio',
        message: 'El precio debe ser un número mayor a 0'
      });
    }

    if (descripcion !== undefined && descripcion !== null &&
        (typeof descripcion !== 'string' || descripcion.trim() === '')) {
      return res.status(400).json({
        field: 'descripcion',
        message: 'Si envías una descripción, debe ser texto válido'
      });
    }

    // Crear producto con los campos normalizados
    const newProduct = await createProductData({
      nombre: nombre.trim(),
      precio,
      descripcion: descripcion == null ? undefined : String(descripcion).trim()
    });

    return res.status(201).json({
      status: 'success',
      message: 'Producto creado exitosamente',
      data: newProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error al crear el producto',
      errorDetail: error.message
    });
  }
};



 
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;  
        const deleted = await deleteProductData(id);
        if (deleted) {
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
    }
};

