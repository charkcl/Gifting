$(function(){
  var giftId = window.location.pathname.split("/")[2]

  API.getOneGift(giftId).then(function(data){
    $('#gift-single').append(
      '<div class="well"> <h2>' +
      data.gift.name +'</h2><h4> Shop: ' +
      data.gift.shop +'</h4><h4> Description: ' +
      data.gift.description + '</h4><h4> Tags: ' +
      data.gift.tags + '</h4><a href="/gifts/' +
      data.gift._id +
      '/edit" class="btn btn-info h4"> Edit </a>' +
      '<a href="/gifts/' + data.gift._id +
      '/delete" class="btn btn-danger h4"> Delete </a></div>'
      )})
  },
  errorHandler
)
