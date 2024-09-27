// 声明中间件检测登录
let checkLoginMiddleWare = (req, res, next) => {
    // 判断
    if (!req.session.username) {
      res.redirect('/login');
    }
    next();
}

module.exports = checkLoginMiddleWare;