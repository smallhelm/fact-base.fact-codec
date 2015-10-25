var escapper = require("./escapper");
var separator = require("./separator");

var decodeArr = function(str){
  var result = [];
  var buff = "";
  var i, c, add_to_buff;
  for(i=0; i<str.length; i++){
    add_to_buff = true;
    c = str[i];
    if(c === separator){
      if(buff.length > 0 && prev_is_escape_char){
        buff = buff.substring(0, buff.length - 1) + c;
      }else{
        result.push(buff);
        buff = "";
      }
      add_to_buff = false;
    }
    if(c === escapper && prev_is_escape_char){
      add_to_buff = false;
    }
    prev_is_escape_char = c === escapper && !prev_is_escape_char;
    if(add_to_buff){
      buff += c;
    }
  }
  result.push(buff);
  return result;
};

module.exports = function(key){
  var arr = decodeArr(key);
  var index = arr[0];
  var fact = {};
  var i;
  for(i = 0; i < index.length; i++){
    fact[index[i]] = arr[i + 1];
  }
  return [index, fact];
};
