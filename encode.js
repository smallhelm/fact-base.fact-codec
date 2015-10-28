var escRegEx = require("escape-regexp");
var separator = require("./separator");
var encodeValue = require("./encodeValue");

module.exports = function(index, fact){
  var arr = [encodeValue(index)];
  var i;
  for(i = 0; i < index.length; i++){
    arr.push(encodeValue(fact[index[i]]));
  }
  return arr.join(separator);
};
