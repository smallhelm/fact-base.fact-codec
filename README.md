# wharfdb.stringfact-codec
Encode stringfacts into sortable keys. Decode keys. Make a matcher (partial encoder) to search through keys.

## Example
```js
var encode      = require("wharfdb.stringfact-codec/encode");
var decode      = require("wharfdb.stringfact-codec/decode");
var makeMatcher = require("wharfdb.stringfact-codec/makeMatcher");

var key = encode("avtoe", {
  e: "12345",
  a: ":user/name",
  v: "Bob",
  t: "txn0001",
  o: "1"
});
var m = makeMatcher("avtoe", {
  a: ":user/name",
  v: "Bob"
});

console.log("key", key);
console.log("decode", decode(key));
console.log("m.prefix", m.prefix);
console.log("m.match(key)", m.match(key));
```
Here's the output:
```txt
key "avtoe!:user/name!Bob!txn0001!1!12345"
decode ["avtoe", {a: ":user/name", v: "Bob", t: "txn0001", o: "1", e: "12345"}]
m.prefix "avtoe!:user/name!Bob!"
m.match(key) true
```

## What is ...
### stringfact
A WharfDB `fact` where all the values are strings. The strings may contain any characters they want and there is no limit on their length.
```js
{
  e: "12345",
  a: ":user/name",
  v: "Bob",
  t: "txn0001",
  o: "1"
}
```

### index
A string that defines the order in which the fact should be sorted. It's expected to be lowercase, no spaces and each character represents the part of the fact.
```js
"eavto"
// - or -
"avtoe"
```

### key
A string that is the encoded fact and index. This key can be stored into your sorted database.
```js
"eavto!12345!:user/name!Bob!txn0001!1"
```

### qStringfact
A partial stringfact where missing keys are considered unknown.
```js
{
  //we know the attribute and value, but we don't know the rest.
  a: ":user/name",
  v: "Bob"
}
```

## API
```js
//Here are the main functions you'll need
var encode      = require("wharfdb.stringfact-codec/encode");
var decode      = require("wharfdb.stringfact-codec/decode");
var makeMatcher = require("wharfdb.stringfact-codec/makeMatcher");

//here are some things that might come in handy if you need advanced stuff.
var encodeValue = require("wharfdb.stringfact-codec/encodeValue");
var separator   = require("wharfdb.stringfact-codec/separator");
var escapper    = require("wharfdb.stringfact-codec/escapper");
```

### encode(index, stringfact) -> key
Given an `index` and a `stringfact` return a `key`.

### decode(key) -> [index, stringfact]
Given a `key` return an array with the decoded `index` and `stringfact`.

### makeMatcher(index, qStringfact) -> {prefix: , matcher: }
Given an `index` and a `qStringfact` return an object with 2 properties:
 * `prefix` - a string that is the prefix of the encoded qStringfact.
 * `matcher(key) -> t/f` - a function that given a key will return true if it matches the qStringfact.

### encodeValue(value) -> encoded\_value
Given any string encode it escaping special characters.

### separator
The character used to separate values in the key.

### escapper
The character used for escaping things.

## License
MIT
