angular.module('IonicChat.controllers')
.controller('OnlineUsersCtrl', function($scope, $state, $sessionStorage) {

   var usersRef = firebase.database().ref("users");
   usersRef.on('value', function(snapshot) {
       $scope.onlineUsers = snapshot.val();
       $scope.$digest();
       console.log(JSON.stringify($scope.onlineUsers));
   }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  

  $scope.goToChatRoom = function(uid) {
    $state.go('app.chats', {uid:uid})
  }
})