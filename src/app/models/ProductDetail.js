// models/ProductDetail.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const ProductDetail = sequelize.define('ProductDetail', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' }, // String en lugar de import
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'product_details',
    timestamps: false,
});

export default ProductDetail;