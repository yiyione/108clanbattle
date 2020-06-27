const { sequelize } = require('../db');
const { Model, DataTypes } = require('sequelize');

class MemberItem extends Model { }

MemberItem.init({
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    alt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    gid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'member',
    timestamps: false
});

class Member {
    async add(member) {
        await MemberItem.create(member);
    }
    async get(query) {
        const option = { where: query };
        return MemberItem.findAll(option);
    }
    async update(member) {
        await MemberItem.update({
            name: member.name,
            gid: member.gid,
            cid: member.cid
        }, {
            where: {
                uid: member.uid,
                alt: member.alt
            }
        });
    }
}

module.exports = { Member };
