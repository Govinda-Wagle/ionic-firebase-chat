// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('IonicChat', ['ionic', 'IonicChat.controllers', 'firebase', 'ngStorage'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {

     var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: "",
      };

      firebase.initializeApp(config);
      var auth = firebase.auth();
      var user = firebase.auth().currentUser;
      console.log(user);


     // var user =  {
     //    email: 'stalliongowin@outlook.com',
     //    password: 'test@123',
     //    uid: 'not available',
     //    online: false
     //  };

      // var messages = {
      //   from: 'uid',
      //   to: 'uid',
      //   message: 'sdfsdtesttesttest',
      //   timestamps: 'current'
      // };

      // var connectedRef = firebase.database().ref(".info/connected");
      //   connectedRef.on("value", function(snap) {
      //     if (snap.val() === true) {
      //       // alert("connected");
      //     } else {
      //       // alert("not connected");
      //     }
      //   });



      // auth.onAuthStateChanged(function(user) {
      //   if (user) {
      //    $state.go('app.chats');
      //     console.log('logged in');
      //     // console.log(JSON.stringify(user));
      //        // var userRefs = firebase.database().ref('users');



      //        // userRefs.on('value', function(snapshot) {
      //        //  var users = snapshot.val();
      //         // console.log(users);
      //        //  angular.forEach(users, function(value, key) {
      //        //    // console.log(value);
      //        //    // console.log(key);
      //        //    // var userRefs2 = firebase.database().ref('users/'+key);
      //        //    // userRefs2.set(true)
      //        //    // var fbObj = $firebaseObject(firebase.("users/" + key));
      //        //    // console.log(fbObj);

      //        //  })
      //        // })
      //     // $state.go('app.browse',{});
      //     // User signed in!
      //     // var uid = user.uid;
      //   } else {
      //     console.log('dsfads');
      //     // User logged out
      //   }
      // });



    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('chatAppLoginAndRegistration', {
       url: '/chatAppLoginAndRegistration',
       abstract:true,
       templateUrl: 'app/LoginAndSignUp/container.html',
     })

     .state('chatAppLoginAndRegistration.login', {
       url: '/login',
       views: {
         'loginContent': {
           templateUrl: 'app/LoginAndSignUp/login.html',
           controller: 'LoginCtrl'
         }
       }
     })

      .state('chatAppLoginAndRegistration.registration', {
       url: '/register',
       views: {
         'loginContent': {
           templateUrl: 'app/LoginAndSignUp/sign_up.html',
           controller: 'RegisterCtrl'
         }
       }
     })



  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

  
  .state('app.onlineUsers', {
        url: '/onlineUsers',
        views: {
          'menuContent': {
            templateUrl: 'app/User/online.html',
            controller: 'OnlineUsersCtrl'
          }
        }
      })


    .state('app.chats', {
      url: '/chats/:uid',
      views: {
        'menuContent': {
          templateUrl: 'app/Chat/chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('chatAppLoginAndRegistration/login');
});