// 导入 express
const express = require('express');
// 导入 moment
const moment = require('moment');
// 导入 AccountModel
const AccountModel = require('../../models/AccountModel');
// 导入 checkLoginMiddleWare 中间件
const checkLoginMiddleWare = require('../../middlewares/checkLoginMiddleWare');

// 创建路由对象
const router = express.Router();

// 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向
  res.redirect('/account');
})

// 记账本的列表
router.get('/account', checkLoginMiddleWare, function(req, res, next) {
  
  // 读取集合信息
  AccountModel.find().sort({time: -1}).then((data, err) => {
    if (err) {
      res.status(500).send('读取失败');
      return;
    }
    // 响应成功的提示
    res.render('list', { accounts: data, moment });
  })
});

// 添加记录
router.get('/account/create', checkLoginMiddleWare, function(req, res, next) {
  res.render('create');
});

// 新增记录
router.post('/account', checkLoginMiddleWare, (req, res) => {
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time字段，由字符串转成时间格式
    time: moment(req.body.time).toDate()
  }).then((data, err) => {
    if (err) {
      res.status(500).send('添加失败');
      return;
    }
    // 成功提醒
    res.render('success', {msg: '添加成功!!!!!', url: '/account'});
  })
});

// 删除记录
router.get('/account/:id', checkLoginMiddleWare, (req, res) => {
  // 获取 URL 地址中params的 id 参数
  let id = req.params.id;
  // 删除
  AccountModel.deleteOne({_id: id}).then((data, err) => {
    if (err) {
      res.status(500).send('删除失败');
      return;
    }
    // 提醒
    res.render('success', {msg: '删除成功!!!!!', url: '/account'});
  });
});

module.exports = router;
