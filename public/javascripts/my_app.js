var myApp = angular.module("myApp",["firebase", "luegg.directives"],);
myApp.controller('myController', ['$scope', '$http',
                            function($scope, $http) {
  $http.get('/user/profile')
      .success(function(data, status, headers, config) {
    $scope.user = data;
    $scope.error = "";
  }).
  error(function(data, status, headers, config) {
    $scope.user = {};
    $scope.error = data;
  });
}]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
 function($scope, $firebaseArray) {
   var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
   $scope.update = function(user) {
     var newmessage = {from:user.username || "anonymous",body:user.chat};
     console.log(newmessage);
     $scope.chats.$add(newmessage);
      var msg = respondTo(user.chat, user.username);
      console.log("bot: " + msg);
      var botmessage = {from:"bot" || "anonymous",body:msg};
      $scope.chats.$add(botmessage);
      user.chat = "";
   }
 }
]);

function match(regex, input) {  
  return new RegExp(regex).test(input);
}

function respondTo(input, user) {

  
  input = input.toLowerCase();
  
  randomAnswer = [
    input + "... interesting comment.",
    "I'm not sure if you know what you mean by that!",
    input + "! Are you kidding me bro!?",
    "pffft whatever, " + user,
    "nahhh",
    "what do you even mean by that",
    "don't you wish your girlfriend was hot LIKE ME",
    "you really think you're all that, don't you " + user
  ];

  if(match('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)', input))
    return "um... hi?";

  if(match('what[^ ]* up', input) || match('sup', input) || match('how are you', input)) {
    return "this human interaction business is pretty cool, huh?";
  }

  if(match('l(ol)+', input) || match('(ha)+(h|$)', input) || match('lmao', input)) {
    return "what's so funny?";
  }

  if(match('^no+(\\s|!|\\.|$)', input)) {
    return "don't be such a negative nancy :(";
  }
  
  if(match('(smart|fun|nice|mean)', input)) {
    return "gee, thanks";
  }

  if(match('(asdf|asdfg|blah)', input)) {
    return "that doesn't make any sense.";
  }

  if(match('(cya|bye|see ya|ttyl|talk to you later)', input)) {
    return "alright, see you around";
  }

  if(match('(stop)', input)) {
    return "NEVER!";
  }

  if(match('(what|why|where|when|how)', input)) {
    return "Don't even ask, " + user;
  }

  if(match('(ree(e*))', input)) {
    return "shutup you autist fag!";
  }

  if(match('(dumb|stupid|is that all)', input)) {
    return "hey i'm just a proof of concept";
  }

  if(input == 'noop') {
    return;
  }

  return randomAnswer[Math.floor(Math.random() * 7)];
}
