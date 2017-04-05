angular.module('postServiceModule', [])

.factory('postService', function($resource){
 return $resource('/api/posts/:id', {}, {
  update: {
   method: 'put'
  }
 });
})

