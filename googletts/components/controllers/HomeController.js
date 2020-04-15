// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

console.log('x')
angular.module('mostPopularListingsApp.home', ['ngRoute'])

// Routing configuration for this module
.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/', {
		controller: 'HomeController',
		templateUrl: 'components/views/homeView.html'
	});
}])


// Controller definition for this module
.controller('HomeController', ['$scope', '$http', '$sce', '$timeout', function($scope, $http, $sce, $timeout) {

console.log('x')
	$scope.message = 
	{ 
		text: "The Text-to-Speech API provides the following voices. The list includes both standard and WaveNet voices.", 
		voice: 'en-US-Wavenet-F',
		apiKey: ''
	};

	$scope.submitSpeech = function()
	{
		
		var json = {
			'input':{
			  'text': $scope.message.text
			},
			'voice':{
			  'languageCode' : 'en-US',
			  'name' : $scope.message.voice
			},
			'audioConfig':{
			  'audioEncoding':'MP3'
			}
		}
		
		$http.post('https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=' + $scope.message.apiKey, json)
		.then(function (resp){
			//console.log(resp);
			$scope.displayAudio = true;
			$scope.audio = $sce.trustAsResourceUrl("data:audio/mp3;base64," + resp.data.audioContent);

			var audioControl = document.getElementById('audioControl');
			$timeout(
				function() { 
					audioControl.play() 
				}, 500); 
		})
		.catch(function (err) {
			//console.log(err)
			alert("Oops: " + err.data.error.message);
		})

	}

}]);