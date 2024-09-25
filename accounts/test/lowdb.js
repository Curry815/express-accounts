// 导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
// 获取 db 对象
const db = low(adapter)

// 初始化数据
db.defaults({ posts: [], user: {} }).write();

// 写入数据
// db.get('posts').push({ id: 2, title: 'lowdb is awesome' }).write();
// db.get('posts').unshift({ id: 3, title: 'lowdb2 is awesome' }).write();
// 获取单条数据
let res2 = db.get('posts').find({ id: 1 }).value();
console.log(res2);


// 删除数据
// let res = db.get('posts').remove({ id: 2 }).write();
// console.log(res);

// 更新数据
db.get('posts').find({ id: 1 }).assign({title: '124'}).write();