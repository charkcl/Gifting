$(function(){
  var giftId = window.location.pathname.split("/")[2]

  API.getOneGift(giftId).then(function(data){
    $('#gift-single').append(data.gift.name)})
  },
  errorHandler
)
