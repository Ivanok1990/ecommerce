// models/OrderItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const OrderItem = sequelize.define('OrderItem', {
    order_id: {
        type: DataTypes.INTEGER,
        references: { model: 'orders', key: 'id' }, // String
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: { model: 'products', key: 'id' }, // String
    },
    // ... (otros campos)
}, {
    tableName: 'order_items',
    timestamps: false,
});

export default OrderItem;