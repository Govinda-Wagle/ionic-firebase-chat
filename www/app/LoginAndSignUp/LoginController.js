angular.module('IonicChat.controllers')
.controller('LoginCtrl', function($scope, $state, $sessionStorage) {

  $scope.loginData = {};

  $scope.goToRegistration = function() {
    $state.go('chatAppLoginAndRegistration.registration')
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
   firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password).then(function(response) {
    $sessionStorage.currentUser = {uid:response.uid, email:response.email};
    var userRef = firebase.database().ref('users/'+$sessionStorage.currentUser.uid+'/online');
     userRef.set(true).then(function(response) {
          $state.go('app.onlineUsers');
    });

    }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });

  };

})