angular.module('IonicChat.controllers')
.controller('OnlineUsersCtrl', function($scope, $state, $sessionStorage) {

  $scope.currentUser = $sessionStorage.currentUser;

   var usersRef = firebase.database().ref("users");
   usersRef.on('value', function(snapshot) {
       $scope.onlineUsers = snapshot.val();
       $scope.$digest();
       console.log(JSON.stringify($scope.onlineUsers));
   }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  

  $scope.goToChatRoom = function(uid, email) {
    $state.go('app.chats', {uid:uid, email:email})
  }
})