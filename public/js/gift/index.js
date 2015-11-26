$(function(){
  getGifts();

  $("#section-search").on("submit", getGifts);
})

function getGifts (e) {
  if (e) e.preventDefault();

  var searchWord = $('#search-input').val();

  API.getAllGifts(searchWord).then(function(data){
    //EMPTY div first
    $('#gift-container').html('');
    //POPULATE GIFT Data
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
  }, errorHandler)
}