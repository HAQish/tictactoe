function Counter() {
  var count = 0;
}

Counter.prototype.increment = function() {
    return count++;
}

var c = new Counter;
c.increment();
c.increment();

function createCounterIncrementer() {
  var count = 0;
  return function() {
    return count++;
  }
}

var c2 = createCounterIncrementer();
c2();
c2();
c2();


[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

[
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]
// 2, 0 => X

[1, "this", [235,2 , 6], 5536, 3.46346, {}]
64-bits
// 0b4js84:
[1][strx026236][arrx0236][5536][3.46346][objx25623]
//
//
// 8427baf:
[1][strx209352][arrx0236][5536][3.46346][objx25623]


026236: [t][h][i][s][!][!]
209352: [t][h][i][s][!][!]



0236: [235][2][6]
2325: [235][2][6]
