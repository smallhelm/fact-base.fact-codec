var _ = require("lodash");
var test = require("tape");
var genInt = require("gent/generator/integer");
var genString = require("gent/generator/string");

var encode = require("./encode");
var decode = require("./decode");
var escapper = require("./escapper");
var separator = require("./separator");
var makeMatcher = require("./makeMatcher");

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
var generateQFact = function(index){
  index = index || generateIndex();
  var fact = generateFact();
  var knowns = _.take(index.split(""), _.random(0, 4));
  var qFact = {};
  _.map(fact, function(v, k){
    if(_.contains(knowns, k)){
      qFact[k] = v;
    }
  });
  return qFact;
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

test("makeMatcher", function(t){
  var test = function(index, qFact){
    var m = makeMatcher(index, qFact);
    var key = encode(index, _.extend(generateFact(), qFact));
    t.ok(m.match(key));
    t.equals(key.indexOf(m.prefix), 0);
  };
  _.each(_.range(0, n_tests), function(){
    var index = generateIndex();
    test(index, generateQFact());//completly random
    test(index, generateQFact(index));//the qFact matches the order of the index
  });
  t.end();
});

test("ensure the encoding has not changed from previous versions", function(t){
  var verify = require("./encoder-samples-to-verify-encoding-integrity.json");
  t.deepEquals(_.size(verify), 200, "ensure all the encoding samples are included");

  _.each(verify, function(v){
    var index = v[0];
    var fact = v[1];
    var encoded = v[2];

    t.deepEquals(encode(index, fact), encoded);
    t.deepEquals(decode(encoded), [index, fact]);
  });

  t.end();
});

///////////////////////////////////////////////////////////
// This will generate a new encoder-samples-to-verify-encoding-integrity.json
// The point is to esnure the encoder doesn't change on the
// next version. Only run this if there is a new, breaking
// version release.
//
//require("fs").writeFileSync("./encoder-samples-to-verify-encoding-integrity.json", JSON.stringify(_.map(_.range(0, 200), function(){
//  var index = generateIndex();
//  var fact = generateFact();
//  return [index, fact, encode(index, fact)];
//})));
