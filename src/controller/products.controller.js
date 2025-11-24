import { getAllProductsData, getProductByIdData, createProductData, deleteProductData, updateProductData} from '../services/products.service.js';

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
    const newProduct = await createProductData(req.body || {});

    return res.status(201).json({
      status: 'success',
      message: 'Producto creado exitosamente',
      data: newProduct
    });

  } catch (error) {
    console.error(error);
    
    if (error.status === 400) {
      return res.status(400).json({
        status: 'error',
        message: 'Validación fallida',
        errors: error.errors || [error.message]
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Error al crear el producto',
      errorDetail: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;  
        const updated = await updateProductData(id, req.body); 
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: `Producto no encontrado con ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
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

