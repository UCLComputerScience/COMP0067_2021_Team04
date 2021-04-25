

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

// date = parseISOString(date)
// console.log(parseISOString(date))

var myVariable = "28 Aug 2014"
var makeDate = new Date();
makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));

console.log(makeDate.toISOString())