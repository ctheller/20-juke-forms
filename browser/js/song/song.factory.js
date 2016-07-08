'use strict';

juke.factory('SongFactory', function ($http, $log) {

  return {
    convert: function (song) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      return song;
    },

    getData: function (res) { return res.data; },

    fetchAllSongs: function(){
    	return $http.get('/api/songs/')
    	.then(this.getData);
    }

  };

});
