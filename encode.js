var escRegEx = require("escape-regexp");
var escapper = require("./escapper");
var separator = require("./separator");

var regexp_all_separators = new RegExp(escRegEx(separator), "g");
var regexp_all_escappers = new RegExp(escRegEx(escapper), "g");

var encodeValue = function(str){
  return str.replace(regexp_all_escappers, escapper + escapper).replace(regexp_all_separators, escapper + separator);
};

module.exports = function(index, fact){
  var arr = [index];
  var i;
  for(i = 0; i < index.length; i++){
    arr.push(encodeValue(fact[index[i]]));
  }
  return arr.join(separator);
};
