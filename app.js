import app from './src/middleware/main.js';
import 'dotenv/config.js';
import productRoutes from './src/routes/products.routes.js';
import userRoutes from './src/routes/users.routes.js';

app.use(['/api/products', '/api/productos'], productRoutes);
app.use(['/api/users','/api/usuarios'], userRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {console.log(`Server en el puerto http://localhost:${PORT}`);});