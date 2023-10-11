var express = require('express');
var router = express.Router();
var db = require('../db')

/* 사용자 목록 페이지이동 */
router.get('/', function(req, res, next) {
  res.render('index',{title:'사용자목록',pageName:'users/list.ejs'})
});

//사용자 목록 json
router.get('/list.json', function(req, res) {
  const sql = 'select * from users order by uid';
  db.get().query(sql,function(err,rows){
    res.send(rows)
  });
});


//로그인 페이지이동
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'login page',pageName:'users/login.ejs' });
});
//로그인체크
router.post('/login', function(req, res, next) {
  const uid = req.body.uid; 
  const upass = req.body.upass;

  let res_code = '0';
  const sql = "SELECT * FROM users WHERE uid=?"; 
  db.get().query(sql,[uid],function(err,rows){
    if(rows[0]){
      if(rows[0].upass == upass){
        res_code = '200';
      } else{
        res_code = '1';
      }
    }    
    res.send(res_code)
  });
});

//회원가입 페이지이동
router.get('/signup', function(req, res) {
  res.render('index', { title: 'signup page',pageName:'users/signup.ejs' });
});
//회원가입
router.post('/signup', function(req, res) {
  const uid= req.body.uid
  const upass=req.body.upass
  const uname=req.body.uname
  const phone=req.body.phone
  const address1=req.body.address1
  const address2=req.body.address2

  const sql = 'insert into users(uid,upass,uname,phone,address1,address2) values(?,?,?,?,?,?);'
  db.get().query(sql,[uid,upass,uname,phone,address1,address2])
  res.redirect('/users/login');
});

module.exports = router;
