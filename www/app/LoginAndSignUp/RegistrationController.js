angular.module('IonicChat.controllers')
.controller('RegisterCtrl', function($scope, $state) {

$scope.registerData = {};

 $scope.goToLogin = function() {
    $state.go('chatAppLoginAndRegistration.login');
  }

$scope.register = function(registerData) {
	console.log(registerData);
	firebase.auth().createUserWithEmailAndPassword($scope.registerData.email, $scope.registerData.password).then(function(response) {
      var user =  {
        email:response.email,
        uid: response.uid,
        online: true
      };
      var dbRef = firebase.database().ref('users');
      dbRef.push(user).then(function(userResponse) {
      	$state.go('chatAppLoginAndRegistration.login');
      });
    }, (function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    }
    ));

}
$scope.goToChats = function() {
	$state.go('app.chats');
}
})