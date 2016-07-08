'use strict';

juke.config(function ($stateProvider) {

  $stateProvider.state('createPlaylist', {
    url: '/playlist/new',
    templateUrl: '/js/playlist/create.playlist.html',
    controller: 'newPlaylistCtrl'
  })
  .state('singlePlaylist', {
    url: '/playlist/:id',
    templateUrl: '/js/playlist/single.playlist.html',
    controller: 'singlePlaylistCtrl'
  })

});