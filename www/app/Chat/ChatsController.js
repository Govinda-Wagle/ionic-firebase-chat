angular.module('IonicChat.controllers')
.controller('ChatsCtrl', function($scope, $sessionStorage, $stateParams, $ionicScrollDelegate, $timeout) {
  var messagesRef = firebase.database().ref("messages");
  var typingIndicatorRef = firebase.database().ref('typing_indicator/'+ $stateParams.uid + '-' + $sessionStorage.currentUser.uid);
  var typeStoppedPromise;

  $scope.$on('$ionicView.enter', function(e) {
    $ionicScrollDelegate.scrollBottom(true);
  });

   typingIndicatorRef.on('value', function(snapshot) {
      $scope.typing = snapshot.val()
      $ionicScrollDelegate.scrollBottom(true);
      $scope.$digest();

   });


  $scope.toChatUser = $stateParams.uid;
  $scope.toChatUserEmail = $stateParams.email;
  $scope.currentUser = $sessionStorage.currentUser;

  $scope.typing = false;

   messagesRef.on('value', function(snapshot) {
      console.log('Messages are'+ JSON.stringify(snapshot.val()));
      $scope.messages = snapshot.val();
       $ionicScrollDelegate.scrollBottom(true);
      $scope.$digest();

   });


  $scope.sendMessage = function(message) {
     var messages = {
        from: $scope.currentUser.uid,
        to:  $scope.toChatUser,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      $scope.data.message = null;
     var dbRef = firebase.database().ref('messages');
     dbRef.push(messages).then(function(response) {
      $ionicScrollDelegate.scrollBottom(true);
     });
    
  }


  $scope.updateTyping = function() {
    $timeout.cancel(typeStoppedPromise);

    var dbRef = firebase.database().ref('typing_indicator/'+ $scope.currentUser.uid +  '-' + $scope.toChatUser);
    dbRef.set(true).then(function(response) {
        $ionicScrollDelegate.scrollBottom(true);
        $scope.$digest();
     });

    typeStoppedPromise = $timeout(function() {
      var dbRef = firebase.database().ref('typing_indicator/'+ $scope.currentUser.uid +  '-' + $scope.toChatUser);
      dbRef.set(false).then(function(response) {
          $ionicScrollDelegate.scrollBottom(true);
          $scope.$digest();
       });
    }, 800);

  }

})