'use strict';

juke.controller('SidebarCtrl', function ($scope, PlaylistFactory, $log) {

	PlaylistFactory.fetchAllPlaylists()
	.then(function(playlists){
		$scope.playlists = playlists;
	})
	.catch($log.error);

});
