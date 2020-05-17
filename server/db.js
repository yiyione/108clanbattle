const sqlite3 = require('sqlite3').verbose();
const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path');
const os = require('os');

const storagePath = path.join(os.homedir(), '.hoshino/clanbattle.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

class Clan extends Model {}

Clan.init({
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

class MemberDao extends Model {}

MemberDao.init({
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

const battleDaoDefine = {
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

const battleDaoTables = {};

const queryAllMembers = query => {
  return new Promise((resolve, reject) => {
    if (query.gid && query.cid) {
      MemberDao.findAll({
          where: {
            gid: query.gid,
            cid: query.cid
          }
        })
        .then(members => resolve(members || []))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    } else {
      return resolve([]);
    }
  });
}

function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

function get_table_name(gid, cid, yyyy, mm) {
    const data = new Date();
    if (yyyy == undefined) {
      yyyy = data.getFullYear();
      mm = data.getMonth();
    }
    return `battle_${gid}_${cid}_${pad(yyyy, 4)}${pad(mm, 2)}`;
}

const queryAllDaos = query => {
  return new Promise((resolve, reject) => {
    const tableName = get_table_name(query.gid, query.cid);
    if (battleDaoTables[tableName] == undefined) {
      console.log(tableName);
      battleDaoTables[tableName] = sequelize.define(tableName, battleDaoDefine, {
        tableName: tableName,
        timestamps: false
      });
    }
    if (query.gid && query.cid && query.uid && query.alt) {
      battleDaoTables[tableName].findAll({
          tableName: tableName,
          where: {
            uid: query.uid,
            alt: query.alt
          }
        })
        .then(daos => resolve(daos || []))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    } else {
      return resolve([]);
    }
  });
}

const queryAllClans = () => {
  return new Promise((resolve, reject) => {
    Clan.findAll()
      .then(clans => resolve(clans || []))
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports = { queryAllMembers, queryAllDaos, queryAllClans }
