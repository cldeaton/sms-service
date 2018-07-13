console.log("your phone will be take over in ...");

var counter = 5;
var selfDestruct = setInterval(function(){
  console.log(counter);
  counter--;
  if (counter === 0) {
    clearInterval(selfDestruct);
    console.log("Booom!!");
  }
}, 1000);


// var counter = 5;
// var selfDestruct = setInterval(function(){
//   twiml.message(counter);
//   counter--;
//   if (counter === 0) {
//     clearInterval(selfDestruct);
//     twiml.message("Booom!!");
//   }
// }, 1000);
