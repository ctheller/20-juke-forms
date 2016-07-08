'use strict';

juke.factory('PlaylistFactory', function ($http) {

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
      return response.data;
    })
  }

  return PlaylistFactory;

});