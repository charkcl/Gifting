$(function(){
  var giftId = window.location.pathname.split("/")[2]

  API.getOneGift(giftId).then(function(data){
    $('#gift-single').prepend(
      '<div class="gift-show-box"> <h2>' +
      data.gift.name +'</h2><h4> Shop: ' +
      data.gift.shop +'</h4><h4> Description: ' +
      data.gift.description + '</h4><h4> Tags: ' +
      data.gift.tags + '</h4><a href="/gifts/' +
      data.gift._id +
      '/edit" class="btn btn-info h4"> Edit </a>'
    )}
  )

  $("#delete-gift").on('submit',function(e){
    e.preventDefault();
    API.deleteGift(giftId).then(function(data){
      window.location.href = '/gifts'
    })
  })

  $("#add-list").on('submit',function(e){
    e.preventDefault();

    var params = {
      list : {
        gift      : giftId,
        recipient : $("#list-recipient").val(),
        quantity : $("#list-quantity").val()
      }
    }

    API.addToList(params).then(function(list){
      window.location.href = '/mylist'
    })
  })


},
  errorHandler
)
