var encode = require("./encode");
var decode = require("./decode");
var makeMatcher = require("./makeMatcher");

var key = encode("avtoe", {
  e: "12345",
  a: ":user/name",
  v: "Bob",
  t: "txn0001",
  o: "1"
});

console.log("key", key);
console.log("decode", decode(key));

var m = makeMatcher("avtoe", {
  a: ":user/name",
  v: "Bob"
});
console.log("m.prefix", m.prefix);
console.log("m.match(key)", m.match(key));
