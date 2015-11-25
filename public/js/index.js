$(function(){
  API.getSecret().then(
    function(data){
      console.log('yeah:', data);
    },
    ErrorHandler;
  )
});