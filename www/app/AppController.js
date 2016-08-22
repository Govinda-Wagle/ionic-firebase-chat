angular.module('IonicChat.controllers')
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $localStorage,$firebaseObject, $sessionStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

	$scope.logout = function() {
		var userRef = firebase.database().ref('users/'+$sessionStorage.currentUser.uid);
		userRef.on("value", function(snapshot) {
		  console.log(snapshot.val());
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

		// firebase.auth().signOut().then(function() {
		//   $state.go('chatAppLoginAndRegistration.login');
		// }, function(error) {
		//   // An error happened.
		//   console.log('Error Occured'+ Error);
		// });

	}


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   firebase.auth().createUserWithEmailAndPassword($scope.loginData.email, $scope.loginData.password).then(function(response) {
  //     var user =  {
  //       email:response.email,
  //       uid: response.uid,
  //       online: true
  //     };
  //     var dbRef = firebase.database().ref('users');
  //     dbRef.push(user);
  //     $state.go('app.playlists');

  //   }, (function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log(errorMessage);
  //     // ...
  //   }
  //   ));

  //   var auth = firebase.auth();


  //   // console.log($firebaseObject);
  //   // var amOnline = $firebaseObject('https://<demo>.firebaseio.com/.info/connected');

  //   // console.log(amOnline);die;


  //  // firebase.auth().signInWithEmailAndPassword('stalliongowin@outlook.com', 'test@123').then(function(response) {
    
  //  //  console.log(JSON.stringify(response));
  //  //  // $localStorage.currentUser = response;
  //  //  // console.log(JSON.stringify($localStorage.currentUser));
  //  //    $state.go('app.chat');
  //  //  }, function(error) {
  //  //     // Handle Errors here.
  //  //      var errorCode = error.code;
  //  //      var errorMessage = error.message;
  //  //      console.log(errorMessage);
  //  //  });


  //    // rootRef.authWithPassword({
  //    //    email    :$scope.loginData.email,
  //    //    password :$scope.loginData.password
  //    //  }, function(error, authData) {
  //    //    if (error) {
  //    //      console.log("Login Failed!", error);
  //    //    } else {
  //    //      console.log("Authenticated successfully with payload:", authData);
  //    //    }
  //    //  });
 

  // };
})