var escRegEx = require("escape-regexp");
var escapper = require("./escapper");
var separator = require("./separator");

var regexp_all_escappers = new RegExp(escRegEx(escapper), "g");
var regexp_all_separators = new RegExp(escRegEx(separator), "g");

module.exports = function(str){
  return str.replace(regexp_all_escappers, escapper + escapper).replace(regexp_all_separators, escapper + separator);
};
