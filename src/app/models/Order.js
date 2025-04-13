// models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';
import User from './User';
import Address from './Address';

const Order = sequelize.define('Order', {
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
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Address, key: 'id' },
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    tableName: 'orders',
    timestamps: false,
});

// Relaciones
Order.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
Order.belongsTo(Address, { foreignKey: 'address_id', as: 'Address' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'Orders', onDelete: 'RESTRICT' });
Address.hasMany(Order, { foreignKey: 'address_id', as: 'Orders', onDelete: 'RESTRICT' });

export default Order;