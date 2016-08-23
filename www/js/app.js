// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('IonicChat', ['ionic', 'IonicChat.controllers', 'firebase', 'ngStorage'])

.run(function($ionicPlatform, $state, $localStorage, $sessionStorage) {
  $ionicPlatform.ready(function() {

     var config = {
        apiKey: "AIzaSyAPl_wcscCcg_7wKgf_uMoJCyJ3WhdRtMU",
        authDomain: "fir-chat-8e158.firebaseapp.com",
        databaseURL: "https://fir-chat-8e158.firebaseio.com",
        storageBucket: "fir-chat-8e158.appspot.com",
      };

      firebase.initializeApp(config);

      if($localStorage.user != undefined) {
         firebase.auth().signInWithEmailAndPassword($localStorage.user.email, $localStorage.user.password).then(function(response) {
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
      }
    
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
      url: '/chats/:uid/:email',
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