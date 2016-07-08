'use strict';

juke.factory('SongFactory', function ($http, $log) {

 	var SongFactory = {};

    SongFactory.convert = function (song) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      return song;
    }


    SongFactory.fetchAllSongs = function(){
    	return $http.get('/api/songs/')
    	.then(function(response){
    		return response.data;
    	})
    	.then(function(songs){
    		return songs.map(SongFactory.convert);
    	});
    	}

  return SongFactory;

});
