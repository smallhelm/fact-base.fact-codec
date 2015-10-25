var _ = require("lodash");
var test = require("tape");
var genInt = require("gent/generator/integer");
var genString = require("gent/generator/string");

var encode = require("./encode");
var decode = require("./decode");
var escapper = require("./escapper");
var separator = require("./separator");

var generateIndex = function(){
  return _.shuffle("eavto".split("")).join("");
};
var generateValue = (function(){
  var nextStr = genString(genInt(0, 1000));
  var nextStrWeighted = genString(genInt(0, 1000), separator + escapper + "abc123\t\n");
  return function(){
      return (_.random(0, 1) > 0 ? nextStrWeighted : nextStr).next().value;
  };
}());
var generateFact = function(){
  return _.object(_.shuffle(_.pairs({
    e: generateValue(),
    a: generateValue(),
    v: generateValue(),
    t: generateValue(),
    o: _.random(0, 1) + ""
  })));
};

var n_tests = 100000;

test("encode and decode " + n_tests + " random facts and indexes", function(t){
  var recode = function(index, fact){
    t.deepEquals(
      [index, fact],
      decode(encode(index, fact))
    );
  };
  
  _.each(_.range(0, n_tests), function(){
    recode(generateIndex(), generateFact());
  });
  t.end();
});
