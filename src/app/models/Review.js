// models/Review.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';
import User from './User';
import Product from './Product';

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Product, key: 'id' },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
    },
    comment: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'reviews',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'product_id'], // Un usuario solo reseña un producto una vez
        },
    ],
});

// Relaciones
Review.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
Review.belongsTo(Product, { foreignKey: 'product_id', as: 'Product' });
User.hasMany(Review, { foreignKey: 'user_id', as: 'Reviews', onDelete: 'CASCADE' });
Product.hasMany(Review, { foreignKey: 'product_id', as: 'Reviews', onDelete: 'CASCADE' });
Product.hasMany(ProductColor, { foreignKey: 'product_id', as: 'ProductColors' });
Product.hasMany(ProductDetail, { foreignKey: 'product_id', as: 'ProductDetails' });
Product.hasMany(Review, { foreignKey: 'product_id', as: 'Reviews' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'OrderItems' });


export default Review;