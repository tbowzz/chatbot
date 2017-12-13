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
      "haha, it was funny when you said \"" + user.chat + ".\" LOL NOT",
       "haha you're fun to talk to... nope",
       "dude just stop talking",
       "don't you guys just wish "
       
     ];
     var msg = replies[0];
       var botmessage = {from:"bot" || "anonymous",body:msg};
       $scope.chats.$add(botmessage);
       user.chat = "";
   }
 }
]);