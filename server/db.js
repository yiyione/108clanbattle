const sqlite3 = require('sqlite3').verbose()
let db

// 连接数据库
function conn () {
  if (!db || !db.open) {
    // db = new sqlite3.Database('~/.hoshino/clanbattle.db')
    db = new sqlite3.Database('C:/Users/yiyi1/.hoshino/clanbattle.db')
  }
  return db
}

const queryAllDao = () => {
  
}

const queryAllClan = () => {
  return new Promise((resolve, reject) => {
    let db = conn()
    db.all('select gid, cid, name, server from clan', (err, rows) => {
      if (err) {
          console.log(err)
          reject(err)
      }
      resolve(rows || [])
    })
  })
}

module.exports = { queryAllDao, queryAllClan }
