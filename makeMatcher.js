var separator = require("./separator");
var encodeValue = require("./encodeValue");
var escapeRegExp = require("escape-regexp");

module.exports = function(index, qFact){
  var prefix_parts = [encodeValue(index)];
  var regexp_parts = [escapeRegExp(encodeValue(index))];
  var found_a_gap = false;
  var i;
  for(i = 0; i < index.length; i++){
    if(qFact.hasOwnProperty(index[i])){
      regexp_parts.push(escapeRegExp(encodeValue(qFact[index[i]])));
      if(!found_a_gap){
        prefix_parts.push(encodeValue(qFact[index[i]]));
      }
    }else{
      regexp_parts.push("[\\s\\S]*");//catch all including newlines
      found_a_gap = true;
    }
  }
  var regexp = new RegExp("^" + regexp_parts.join(escapeRegExp(separator)) + "$");
  return {
    prefix: prefix_parts.join(separator) + separator,
    match: function(key){
      return regexp.test(key);
    }
  };
};
