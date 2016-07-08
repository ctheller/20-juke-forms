'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory) {

  var cachedPlaylists = [];

  var PlaylistFactory = {};

  PlaylistFactory.fetchAllPlaylists = function () {
    return $http.get('/api/playlists')
    .then(function (response) {
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    });
  };

  PlaylistFactory.create = function (name) {
    return $http.post('/api/playlists', {name: name})
    .then(function (response) {
      var playlist = response.data
      cachedPlaylists.push(playlist);
      return playlist;
    });
  };

  PlaylistFactory.getPlaylistById = function(id){
    return $http.get('api/playlists/'+id)
    .then(function(response){
      response.data.songs.map(SongFactory.convert);
      return response.data;
    })
  }

  PlaylistFactory.addSong = function(playlist, song){
    return $http.post('api/playlists/'+playlist.id+"/songs", {playlist: playlist, song: song})
    .then(function(response){

      return SongFactory.convert(response.data);
    })
  }

  return PlaylistFactory;

});