const express = require('express');
const md5 = require('md5');
const router = express.Router();
// 导入用户数据
const UserModel = require('../../models/UserModel');


// 注册
router.get('/reg', (req, res) => {
    // 响应 HTML 内容
    res.render('auth/reg');
})

// 注册用户
router.post('/reg', (req, res) => {
    // 表单验证
    // 获取请求体的数据
    UserModel.create({...req.body, password: md5(req.body.password)}).then((data, err) => {
        if (err) {
            res.status(500).send('注册失败');
            return;
        }
        res.render('success', {msg: '注册成功', url: '/login'});
    })
})

// 登录页面
router.get('/login', (req, res) => {
    // 响应 HTML 内容
    res.render('auth/login');
})

// 登录操作
router.post('/login', (req, res) => {
    // 查询数据库
    let { username, password } = req.body;
    UserModel.findOne({username: username, password: md5(password)}).then((data, err) => {
        if (err) {
            res.status(500).send('登录失败');
            return;
        }
        // 判断data
        if (!data) {
            return res.send('用户名或密码错误');
        }
        // 写入session
        req.session.username = data.username;
        req.session._id = data._id;

        // 登录成功
        res.render('success', {msg: '登录成功', url: '/account'});
    })
})

// 退出登录
router.post('/logout', (req, res) => {
    // 销毁 session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功', url: '/login'});
    })
})

module.exports = router;
