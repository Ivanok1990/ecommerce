// models/ProductColor.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const ProductColor = sequelize.define('ProductColor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' }, // Usa el nombre de la tabla como string
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
}, {
    tableName: 'product_colors',
    timestamps: false,
});

// La relación se define en models/index.js o después de que todos los modelos estén cargados

export default ProductColor;