$(function(){
  API.getAllGifts().then(function(data){
    data.gifts.forEach(function(gift){
      $('#gift-container').append(
        '<div class="col-xs-6 portfolio-item well"> <h2>' +
        gift.name +'</h2><h4> Shop: ' +
        gift.shop +'</h4><h4> Description: ' +
        gift.description + '</h4><h4> Tags: ' +
        gift.tags + '</h4><a href="/gifts/' +
        gift._id +
        '" class="btn btn-info h4"> Show </a></div>'
      )
    })
  }, errorHandler
  )
})
