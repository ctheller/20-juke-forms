'use strict';

juke.controller('newPlaylistCtrl', function ($scope, PlaylistFactory, $state) {

  $scope.submit = function(){
  	if ($scope.newPlaylistForm.$invalid) return;
  	PlaylistFactory.create($scope.newPlaylist.name)
  	.then(function(result){
  		$scope.submittedPlaylist = result;
  		$scope.newPlaylist.name = '';
  		$state.go('singlePlaylist', {id: result.id});
  	})
  }

});

juke.controller('singlePlaylistCtrl', function ($scope, $log, PlaylistFactory, SongFactory, $stateParams, PlayerFactory) {
	
	PlaylistFactory.getPlaylistById($stateParams.id)
	.then(function(playlist){
		$scope.playlist = playlist;
	})
	.catch($log.error);

	$scope.submit = function(){
		if (!$scope.selectedSong) return;
		console.log("submitted!");
		PlaylistFactory.addSong($scope.playlist, $scope.selectedSong)
		.then(function(newSong){
			$scope.playlist.songs.push(newSong);
		});
		$scope.selectedSong = null;
	};
		//adds new song to playlist. Uses playlist factory to do so.
	

	$scope.removeSong = function(song){
		PlaylistFactory.removeSong($scope.playlist, song)
		.then(function(response){
			var index = $scope.playlist.songs.indexOf(song);
			$scope.playlist.songs.splice(index, 1);
		});
	}

	SongFactory.fetchAllSongs()
	.then(function(songs){
		$scope.songs = songs;
	})
	.catch($log.error);
	
	$scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

});