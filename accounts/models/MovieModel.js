// 导入mongoose
const mongoose = require('mongoose');

// 创建文档的结构对象
// 设置文档的属性以及属性值的类型
let MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
});

// 创建模型对象，对文档操作的封装对象
let MovieModel = mongoose.model('movie', MovieSchema);

// 暴露模型对象
module.exports = MovieModel;