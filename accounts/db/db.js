/***
 * @param {*} success 连接成功的回调
 * @param {*} error 连接失败的回调
 */
module.exports = function (success, error) {
    // 判断 error 为其设置默认值
    if (typeof error !== 'function') {
        error = () => {
            console.log('连接失败');
        }
    }

    //1. 安装 mongoose
    //2. 导入 mongoose
    const mongoose = require('mongoose');
    // 导入配置文件
    const { DBHOST, DBPORT, DBNAME } = require('../config/config');

    //3. 连接 mongodb 服务                       
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    //4. 设置回调
    // 设置连接成功的回调  once 回调函数只执行一次
    mongoose.connection.once('open', () => {
        success();
    });

    // 设置连接错误的回调
    mongoose.connection.on('error', () => {
        error();
    });

    //设置连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    });
}