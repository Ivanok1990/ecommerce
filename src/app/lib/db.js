// lib/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://u826420819_root:Omarcito1990-@127.0.0.1:3306/u826420819_OmarQ', {
    dialect: 'mysql',
    dialectModule: require('mysql'), // Usa el paquete 'mysql' estándar
});

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Conectado a MySQL');
    } catch (error) {
        console.error('Error al conectar a MySQL:', error);
        throw error;
    }
}

export default sequelize;