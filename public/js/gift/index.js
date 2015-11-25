$(function(){
  API.getAllGifts().then(function(data){
    data.gifts.forEach(function(gift){
      $('#gift-container').append(gift.name)})
  }, errorHandler
  )
})