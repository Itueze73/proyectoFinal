export  class UserModel {
    constructor(id, nombre, email, rol, ubicacion, experiencia) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol || 'Sin asignar';
        this.ubicacion = ubicacion || 'Desconocida';
        this.experiencia = experiencia || 'No especificada';
    }
}

