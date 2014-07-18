var express = require('express');
var router = express.Router();
var DBUtils = require('../lib/utils/mySqlUtils');
var logger = require('../lib/utils/log4js_wrapper')('index.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', function(req, res) {
  var nationalid = req.param('nationalid', '310115198701014321');

  logger.info('request nationalid = ' + nationalid);
  var params = [];
  params.push(nationalid);

  DBUtils().executeQuery("select * from employee_tbl where nationalid = ? and flag = 'Y'", params, function(err, result) {
    //query from DB
    if (row = result[0]) {
      if(req.session.loginFlag === undefined){
        logger.info('create session.nationalid:' + nationalid)
        req.session.loginFlag = true;
        req.session.nationalid = nationalid;
        req.session.employeename = row.employeename;
        req.session.employeeid = row.employeeid;
        req.session.groupid = row.groupid;
        req.session.lineid = row.lineid;
      }
      logger.info('Attempt to return employee[nationalid=' + nationalid  + '] json info data.');
      res.json({
        employeename: row.employeename,
        employeeid: row.employeeid,
        groupid: row.groupid,
        lineid: row.lineid,
      });
    }else {
      logger.warn('Can not find nationalid = ' + nationalid);
      res.json({status:'error', errorMsg: '找不到身份证id[' + nationalid + '], 请重新登录.'});
    }
  });

});

router.post('/signout', function(req, res) {
  logger.info('Try to signout, nationalid = ' + req.session.nationalid);
  req.session.destroy(function(err) {
    if (err)
      logger.error(err);
      res.json({status:'error'});
  })
  logger.info('Signout successfully.')
  res.json({});
});

router.post('/submitResult', function(req, res) {
  var score = req.param('score');
  var nationalid = req.session.nationalid;
  logger.info('Get request parameter score = ' + score + ', nationalid = ' + nationalid);
  var params = [];
  params.push(nationalid);
  params.push(score);
  params.push(null);
  if(score && nationalid) {
    DBUtils().executeInsert("insert into exam_score_record_tbl(nationalid,score,elapsed_ts) values(?,?,?)", params, function(err, result) {
      if(err) {
        logger.error('Encounter error while inserting into score table, ' + err);
        res.json({status: 'error', errorMsg: '数据库操作异常, 请重新尝试!'});
      }

      logger.info('Generate key id =' + result.insertId + ', then attempt to return operation status.');
      res.json({status: 'success'});
    });
  }
});

module.exports = router;
