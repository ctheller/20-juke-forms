'use strict';

juke.controller('newPlaylistCtrl', function ($scope, PlaylistFactory, $state) {

  $scope.submit = function(){
  	if ($scope.newPlaylistForm.$invalid) return;
  	PlaylistFactory.create($scope.newPlaylist.name)
  	.then(function(result){
  		console.log($scope.newPlaylistForm);
  		$scope.submittedPlaylist = result;
  		$scope.newPlaylist.name = '';
  		$state.go('singlePlaylist', {id: result.id});
  	})
  }

});

juke.controller('singlePlaylistCtrl', function ($scope, $log, PlaylistFactory, SongFactory, $stateParams) {
	
	PlaylistFactory.getPlaylistById($stateParams.id)
	.then(function(playlist){
		$scope.playlist = playlist;
	})
	.catch($log.error);

	$scope.submit = function(){
		if (!$scope.selectedSong) return;
		console.log("submitted!");
		
	};
		//adds new song to playlist. Uses playlist factory to do so.
	
	SongFactory.fetchAllSongs()
	.then(function(songs){
		$scope.songs = songs;
	})
	.catch($log.error);
	

});