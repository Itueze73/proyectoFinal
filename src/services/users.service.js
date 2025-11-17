import bcrypt from "bcryptjs";

const users = [{ 
      id: 1, 
      nombre: 'Ana García',
      email: 'ana.garcia@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'Desarrolladora Frontend',
      ubicacion: 'Buenos Aires, Argentina',
      experiencia: '3 años'
    },
    { 
      id: 2, 
      nombre: 'Luis Martínez',
      email: 'luis.martinez@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'Backend Developer',
      ubicacion: 'Córdoba, Argentina',
      experiencia: '5 años'
    },
    { 
      id: 3, 
      nombre: 'Carla Rodríguez',
      email: 'carla.rodriguez@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'Full Stack Developer',
      ubicacion: 'Rosario, Argentina',
      experiencia: '4 años'
    },
    { 
      id: 4, 
      nombre: 'Pedro Gómez',
      email: 'pedro.gomez@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'DevOps Engineer',
      ubicacion: 'Mendoza, Argentina',
      experiencia: '6 años'
    },];

export const getAllUsersData = async () => {
    return users.map(user => ({ ...user, password: undefined }));
};

export const getUserByIdData = async (id) => {
    const user = users.find(user => user.id === parseInt(id));
    if (user) {
        return { ...user, password: undefined };
    }
    return null;
};  

export const createUserData = async (userData) => {
    const { nombre, email, password, rol, ubicacion, experiencia } = userData;
    if (!nombre || !email || !password) {
        throw new Error('Nombre, email y password son obligatorios');
    } 

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
        id: `${Date.now()}`, 
        nombre, 
        email, 
        password: hashedPassword, 
        rol: rol || 'Sin asignar', 
        ubicacion : ubicacion || 'Desconocida', 
        experiencia: experiencia || 'No especificada'
    };
    users.push(newUser);
    return { ...newUser, password: undefined };
};  

export const deleteUserData = async (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};      

