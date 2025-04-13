import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';
import Category from './Category';
import ProductColor from './ProductColor';
import ProductDetail from './ProductDetail';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'Category' });
Product.hasMany(ProductColor, { foreignKey: 'product_id', as: 'ProductColors' });
Product.hasMany(ProductDetail, { foreignKey: 'product_id', as: 'ProductDetails' });

export default Product;