var errorHandler = function(error){
  console.log(error);
  alert('API Error:' + error.responseJSON.message);
}
