const { sequelize } = require('../db');
const { Model, DataTypes } = require('sequelize');

class ClanItem extends Model { }

ClanItem.init({
    gid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    cid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    server: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'clan',
    timestamps: false
});

class Clan {
    async get(query) {
        const option = { where: query };
        return ClanItem.findAll(option);
    }
}

module.exports = { Clan };
