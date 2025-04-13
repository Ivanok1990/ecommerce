// models/Address.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';
import User from './User';

const Address = sequelize.define('Address', {
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
    street: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'addresses',
    timestamps: false,
});

// Relación
Address.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
User.hasMany(Address, { foreignKey: 'user_id', as: 'Addresses', onDelete: 'CASCADE' });

export default Address;