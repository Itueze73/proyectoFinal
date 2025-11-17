import productRoutes from './src/routes/products.routes.js';
import userRoutes from './src/routes/users.routes.js';
import app from './src/middleware/main.js';

app.use(['/api/products', '/api/productos'], productRoutes);
app.use(['/api/users','/api/usuarios'], userRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = 3000;

app.listen(PORT, () => {console.log(`Server en el puerto http://localhost:${PORT}`);});