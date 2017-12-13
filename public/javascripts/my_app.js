var myApp = angular.module("myApp",["firebase"]);
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
     var replies = [
       "hey! I'm glad you're here.",
       "haha you're fun to listen to...",
      "haha, it was funny when you said \"" + user.chat + ".\" LOL NOT",
       ":)",
       "Want to hear a joke?\nYo mamma so fat, she has her own moons!",
       "How long will you stay here?"
     ];
      var msg = respondTo(user.chat);
      console.log("bot: " + msg);
      var botmessage = {from:"bot" || "anonymous",body:msg};
      $scope.chats.$add(botmessage);
      user.chat = "";
   }
 }
]);

myApp.directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      console.log(document.querySelector("#scrollingContainer").scrollHeight);
      // document.querySelector("#scrollingContainer").scrollTop;
      // window.scrollTo(0,document.querySelector("#scrollingContainer").scrollHeight - 1);
    }
  };
})

function match(regex, input) {  
  return new RegExp(regex).test(input);
}

function respondTo(input) {

  input = input.toLowerCase();

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
    return ["alright, see you around", "good teamwork!"];
  }

  if(match('(dumb|stupid|is that all)', input)) {
    return "hey i'm just a proof of concept";
  }

  if(input == 'noop') {
    return;
  }

  return input + " what?";
}
