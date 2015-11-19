// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('FindMe', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//Services

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

// AngularUI Router module

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tabs.finds', {
      url: "/finds",
      views: {
        'finds-tab': {
          templateUrl: "templates/finds.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tabs.newfind', {
      url: "/newfind",
      views: {
        'newfind-tab': {
          templateUrl: "templates/newfind.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tabs.map', {
      url: "/map",
      views: {
        'map-tab': {
          templateUrl: "templates/map.html",
        }
      }
    })

  $stateProvider
    .state('details', {
      url: "/details",
      abstract: true,
      templateUrl: "templates/find-detail.html"
    })

    .state('details.find-detail', {
      url: "/find-detail",
      views: {
        'find-detail': {
          templateUrl: "templates/find-detail.html",
          controller: 'HomeCtrl'
        }
      }
    })


   $urlRouterProvider.otherwise("/tab/finds");

})

//Controllers

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('HomeCtrl', function($scope, $ionicSideMenuDelegate, $ionicHistory, Camera) {

    //Menu Toggle
    $scope.toggleMenu = function(){
    $ionicSideMenuDelegate.toggleLeft();
  }

  function MyCtrl($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
}

function takePicture() {
  navigator.camera.getPicture(function(imageURI) {

    // imageURI is the URL of the image that we can use for
    // an <img> element or backgroundImage.

  }, function(err) {

    // Ruh-roh, something bad happened

  }, cameraOptions);
}

$scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    })
  }

})





