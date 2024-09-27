// 导入 jwt
const jwt = require('jsonwebtoken');
// 导入配置项
const { secret } = require('../config/config');

// 声明校验token的中间件
module.exports = (req, res, next) => {
    // 获取 token
    let token = req.get('token');
    // 判断是否有token
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token缺失',
            data: null
        })
    }
    // 校验 token
    jwt.verify(token, secret, (err, data) => {
        // 检测token是否有效
        if (err) {
            return res.json({
                code: '2004',
                msg: 'token校验失败',
                data: null
            })
        }
        // 保存用户的信息 - 用户权限
        req.user = data; // req.session
        // 检验token成功,放行
        next();
    });
};