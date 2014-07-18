var mysql = require('mysql');
var logger = require('./log4js_wrapper')('DBUtils-mySqlUtils.js');

var DBUtils = function() {
  if (!(this instanceof DBUtils)) {
    return new DBUtils();
  }
  this.connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'metroexam_db'});
};

module.exports = DBUtils;

/**
  * select operation
  */
DBUtils.prototype.executeQuery = function(sql, params, handler) {
  if (params === undefined) params = [];
  this.connection.connect();
  var query = this.connection.query(sql, params, handler);
  logger.info('exec sql:' + query.sql);
  this.connection.end();
}

/**
 * update/delete operation
 */
DBUtils.prototype.executeUpdOrDel = function(sql, params, handler) {
  if (params === undefined) params = [];
  this.connection.connect();
  var query = this.connection.query(sql, params, handler);
  logger.info('exec sql: ' + query.sql);
  this.connection.end();
}

/**
  * insert operation
  */
DBUtils.prototype.executeInsert = function(sql, params, handler) {
  if (params === undefined) params = [];
  this.connection.connect();
  var query = this.connection.query(sql, params, handler);
  logger.info('exec sql: '+ query.sql);
  this.connection.end();
}

