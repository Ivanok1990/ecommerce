// models/index.js
import sequelize from '../lib/db';
import User from './User';
import Category from './Category';
import Product from './Product';
import ProductColor from './ProductColor';
import ProductDetail from './ProductDetail';
import Address from './Address';
import Order from './Order';
import OrderItem from './OrderItem';
import Review from './Review';

// Exportar todos los modelos
export {
    User,
    Category,
    Product,
    ProductColor,
    ProductDetail,
    Address,
    Order,
    OrderItem,
    Review,
};

// Sincronizar modelos con la base de datos (opcional, para pruebas)
async function syncModels() {
    try {
        await sequelize.sync({ alter: true }); // Ajusta las tablas existentes si cambian
        console.log('Modelos sincronizados con la base de datos');
    } catch (error) {
        console.error('Error al sincronizar modelos:', error);
    }
}

Product.hasMany(ProductColor, { foreignKey: 'product_id', as: 'ProductColors' });
ProductColor.belongsTo(Product, { foreignKey: 'product_id', as: 'Product' });

// Ejecutar sincronización al importar (solo para desarrollo)
syncModels();

export default sequelize;