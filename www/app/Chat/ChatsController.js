angular.module('IonicChat.controllers')
.controller('ChatsCtrl', function($scope, $sessionStorage, $stateParams) {

  console.log($sessionStorage.currentUser);
  var messagesRef = firebase.database().ref("messages");
  $scope.toChatUser = $stateParams.uid;
  $scope.currentUser = $sessionStorage.currentUser;
  console.log($scope.toChatUser);
  console.log($sessionStorage.currentUser);


  // $scope.messages = {"-KPf6PxYtBhT-WmSLxRD":{"from":"uid","message":"First message","to":"uid"}};
   messagesRef.on('value', function(snapshot) {
    console.log('Messages are'+ JSON.stringify(snapshot.val()));
    $scope.messages = snapshot.val();
    $scope.$digest();

   });


  $scope.sendMessage = function(message) {
     var messages = {
        from: $scope.currentUser.uid,
        to:  $scope.toChatUser,
        message: message
        //timestamps: 'current'
      };
      console.log(messages);
     var dbRef = firebase.database().ref('messages');
     dbRef.push(messages);

    // console.log('Messages are here'+ message);
  }

  $scope.$on('$ionicView.beforeEnter', function(){ 
     var usersRef = firebase.database().ref("users");
         usersRef.on('value', function(snapshot) {
          console.log(snapshot.val());
            // var users = snapshot.val();
            // $scope.users = snapshot.val();
             $scope.firebaseUsers = snapshot.val();
             console.log(JSON.stringify($scope.firebaseUsers));
            //   angular.forEach(snapshot.val(), function(value, key) {
            //   console.log(value);
            //   console.log(key);
            //    $scope.firebaseUsers.push(value);
            //    // console.log()
            //   // var userRefs2 = firebase.database().ref('users/'+key);
            //   // userRefs2.set(true)
            //   // var fbObj = $firebaseObject(firebase.("users/" + key));
            //   // console.log(fbObj);

            // })


             // console.log($scope.firebaseUsers);
         }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
  

 
})
})