$(function(){
  var submitted = false;

  $('#new-gift').on('submit', function (e){
    e.preventDefault();

    if(!submitted){
      var params = {
        gift : {
          name        : $("#gift-name").val(),
          shop        : $("#gift-shop").val(),
          description : $("#gift-description").val(),
          tags        : $("#gift-tags").val()
        }
      }

      API.createGift(params).then(function(gift){
        console.log(gift);
        debugger
        window.location.href = "/gifts/" + gift._id;
      }, function(error){
        submitted = false;
      })
      submitted = true;
    }
  })
});
