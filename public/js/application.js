$().ready(function(){

  // // Instantiate our API WRAPPER
  // var API = new API_WRAPPER();

  // var ErrorHandler = function(error){
  //   console.log(error);
  //   alert('API Error: ' + error.responseJSON.message);
  // };

  // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
  // API.getSecret().then(
  //   function(data){
  //     console.log('yeah:', data)
  //   },
  //   ErrorHandler
  // );

  window.ErrorHandler = function(error){
    console.log(error);
    alert('API Error:' + error.responseJSON.message);
  }

});
