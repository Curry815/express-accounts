const express = require('express');
const router = express.Router();
// 导入 moment
const moment = require('moment');
// 导入 AccountModel
const AccountModel = require('../../models/AccountModel');
// 导入 UserModel
const UserModel = require('../../models/UserModel');

// 声明token的中间件
const checkTokenMiddleWare = require('../../middlewares/checkTokenMiddleWare');

// 记账本的列表
router.get('/account', checkTokenMiddleWare, (req, res) => {  
  // 用户权限
  // 判断当前有无用户,如果没有,则跳转登录页面
  // if (!req.user.username) {
  //   return res.redirect('/login');
  // }
  // 根据_id查询用户信息
  UserModel.findById({_id: req.user._id})
    .then((data, err) => {
      if (err) {
        res.json({
          code: '1007',
          msg: '读取失败',
          data: null
        })
        reject('读取失败');
        return;
      }
    })
    .then((data, err) => {
      // 查找用户成功则读取集合信息
      AccountModel.find().sort({ time: -1 }).then((data, err) => {
        if (err) {
          res.json({
            code: '1001',
            msg: '读取失败',
            data: null
          })
          return;
        }
        console.log(data);
        
        // 响应成功的提示
        res.json({
          // 响应编号
          code: '0000',
          // 响应信息
          msg: '读取成功',
          // 响应的数据
          data: data
        })
      });
    })
});

// 新增记录
router.post('/account', checkTokenMiddleWare, (req, res) => {
  // 表单验证
  req.checkBody('title', '标题不能为空').notEmpty();
  req.checkBody('account', '收入不能为空').notEmpty();
  req.checkBody('account', '收入不能为负数').isInt({ min: 0 });
  req.checkBody('type', '类型不能为空').notEmpty();


  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time字段，由字符串转成时间格式
    time: moment(req.body.time).toDate()
  }).then((data, err) => {
    if (err) {
      res.json({
        code: '1002',
        msg: '创建失败',
        data: null
      })
      return;
    }
    // 响应成功的提示
    res.json({
      code: '0000',
      msg: '创建成功',
      data: data
    })
  })
});

// 删除记录
router.delete('/account/:id', checkTokenMiddleWare, (req, res) => {
  // 获取 URL 地址中params的 id 参数
  let id = req.params.id;
  // 删除
  AccountModel.deleteOne({ _id: id }).then((data, err) => {
    if (err) {
      res.json({
        code: '1003',
        msg: '删除失败',
        data: null
      })
      return;
    }
    // 响应成功的提示
    res.json({
      code: '0000',
      msg: '删除成功',
      data: {}
    })
  });
});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleWare, (req, res) => {
  // 获取 URL 地址中params的 id 参数
  let id = req.params.id;
  // 查询数据库
  AccountModel.findById(id).then((data, err) => {
    if (err) {
      return res.json({
        code: '1004',
        msg: '查询失败',
        data: null
      })
    }
    res.json({
      code: '0000',
      msg: '查询成功',
      data: data
    })
  })
});

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleWare, (req, res) => {
  // 获取 URL 地址中params的 id 参数
  let id = req.params.id;
  // 查询数据库
  AccountModel.updateOne({ _id: id }, req.body).then((data, err) => {
    if (err) {
      return res.json({
        code: '1005',
        msg: '更新失败',
        data: null
      })
    }
    res.json({
      code: '0000',
      msg: '更新成功',
      data: req.body
    })
  })
});

module.exports = router;
