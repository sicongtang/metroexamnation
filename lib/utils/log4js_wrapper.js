var log4js = require('log4js');

module.exports = function(category){
  log4js.configure('lib/utils/metroexam_server_log4js_conf.json', {reloadSecs: 300, category: category});
  var logger = log4js.getLogger(category);
  return logger;
}
