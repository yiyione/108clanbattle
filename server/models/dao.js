const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const daoDefine = {
    eid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    alt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    round: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    boss: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dmg: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    flag: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

function pad(num, size) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}

function getDateString(date) {
    if (date === undefined) {
        date = new Date();
    }

    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 20) {
        mm = mm - 1;
    }

    if (mm < 1) {
        mm = 12;
        yyyy = yyyy - 1;
    }

    return {
        yyyy,
        mm,
        dd
    };
}

function get_table_name(gid, cid, yyyy, mm) {
    if (yyyy == undefined) {
        const dateString = getDateString();
        yyyy = dateString.yyyy;
        mm = dateString.mm;
    }
    return `battle_${gid}_${cid}_${pad(yyyy, 4)}${pad(mm, 2)}`;
}

class Dao {
    constructor() {
        this.table = {};
    }

    getTable(query) {
        const tableName = get_table_name(query.gid, query.cid, query.yyyy, query.mm);
        if (this.table[tableName] == undefined) {
            this.table[tableName] = sequelize.define(tableName, daoDefine, {
                tableName: tableName,
                timestamps: false
            });
        }
        return { name: tableName, table: this.table[tableName] };
    }
    
    async get(query) {
        if (query.gid && query.cid) {
            const dao = this.getTable(query);
            return await dao.table.findAll({
                tableName: dao.name,
                where: {
                    ...(query.uid && { uid: query.uid }),
                    ...(query.alt && { alt: query.alt })
                },
                order: [
                    ['round'],
                    ['boss'],
                    ['eid']
                ],
                raw: true
            });
        } else {
            return [];
        }
    }
}

module.exports = { Dao };
