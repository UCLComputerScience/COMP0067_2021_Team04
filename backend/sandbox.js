

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

// date = parseISOString(date)
// console.log(parseISOString(date))


var makeDate = new Date();
console.log("makeDate:")
console.log(makeDate.getMonth())
lol = new Date(makeDate.setMonth(makeDate.getMonth() - 4));
console.log("Lol:")
console.log(lol)
console.log("lol.getMonth():")
console.log(lol.getMonth()+1)

var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

lastFiveMonths = [lol.getMonth()]
console.log(lastFiveMonths)
monthsDictionary = {

}

testStatistics = [
  {
  datePosted: "2011-04-05T14:48:00.000Z",
  experience: 50
  },
  {
    datePosted: "2011-03-05T14:48:00.000Z",
    experience: 25
    },
    {
      datePosted: "2011-02-05T14:48:00.000Z",
      experience: 80
      },
  ]

//initialise
for (i=0; i<lastFiveMonths.length; i++){
  monthsDictionary[months[lastFiveMonths[i]]] = 0
}
// populate
for (i=0; i<testStatistics.length; i++){
  monthsDictionary[months[parseInt(testStatistics[i].datePosted.slice(5,7))]] += testStatistics[i].experience
}

console.log(monthsDictionary)



