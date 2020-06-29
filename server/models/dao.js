const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const { MiraiSession } = require('./miraiSession');

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

    async getDayDaos(query) {
        const daos = await this.get(query);
        const dayDaos = [];
        const today = getDateString();
        for (const dao of daos) {
            if (getDateString(new Date(dao.time)).dd === today.dd) {
                dayDaos.push(dao);
            }
        }
        return dayDaos;
    }

    async remain(targets, source, query) {
        const daos = await this.getDayDaos(query);
        const cnt = {};
        for (const target of targets) {
            cnt[target] = 3;
        }
        for (const dao of daos) {
            if (cnt[dao.uid]) {
                if (dao.flag === 0x01 || dao.flag === 0x02) {
                    cnt[dao.uid] -= 0.5;
                } else {
                    cnt[dao.uid] -= 1;
                }
            }
        }
        const message = [{
            type: 'Plain',
            text: `====催刀====\n`
        }];
        for (const [uid, left] of Object.entries(cnt)) {
            message.push({
                type: 'Plain',
                text: `剩${left}刀 | `
            }, {
                type: 'At',
                target: uid,
                display: ''
            }, {
                type: 'Plain',
                text: '\n'
            });
        }

        message.push({
            type: 'Plain',
            text: `===========\n在？${source}喊你出刀啦！`
        })

        const miraiSession = new MiraiSession();
        if (source) {
            return await miraiSession.sendGroupMessageAllInOne(query.gid, message);
        } else {
            return "Gid ERROR";
        }
    }
}

module.exports = { Dao };
