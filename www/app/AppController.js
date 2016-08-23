angular.module('IonicChat.controllers')
.controller('AppCtrl', function($scope,  $state, $localStorage, $sessionStorage) {

	$scope.logout = function() {
		var userRef = firebase.database().ref('users/'+$sessionStorage.currentUser.uid+'/online');
     userRef.set(false).then(function(response) {
          firebase.auth().signOut().then(function() {
            delete $localStorage.user;
            $state.go('chatAppLoginAndRegistration.login');
          }, function(error) {
            // An error happened.
            console.log('Error Occured'+ Error);
     });
    });
	}


  $scope.getOnlineUsers = function() {
    $state.go('app.onlineUsers');
  }
})