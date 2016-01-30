$(function(){
  getGifts();

  $("#gift-search").on("submit", getGifts);
})

function getGifts (e) {
  if (e) e.preventDefault();

  var searchWord = $('#search-input').val();

  API.getAllGifts(searchWord).then(function(gifts){
    //EMPTY div first
    $('#gift-container').html('');
    //POPULATE GIFT Data
    gifts.forEach(function(gift){
      $('#gift-container').append(
        '<div class="col-sm-5 gift-box"> <h3>' +
        gift.name +'</h3><h4> Shop: ' +
        gift.shop +'</h4><h4> Description: ' +
        gift.description + '</h4><h4> Tags: ' +
        gift.tags + '</h4><a href="/gifts/' +
        gift._id +
        '" class="btn btn-info h4 pull-right"> Show </a></div>'
      )
    })
  }, errorHandler)
}
