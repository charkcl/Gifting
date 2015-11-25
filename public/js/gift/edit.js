$(function(){

  var giftId = window.location.pathname.split("/")[2];

  API.getOneGift(giftId).then(function (data){
    $('#edit-gift-name').val(data.gift.name);
    $('#edit-gift-shop').val(data.gift.shop);
    $('#edit-gift-description').val(data.gift.description);
    $('#edit-gift-tags').val(data.gift.tags);
  }, errorHandler);

  $('#edit-gift').on('submit', function (e) {
    e.preventDefault();

    var params = {
      gift: {
        name        : $('#edit-gift-name').val(),
        shop        : $('#edit-gift-shop').val(),
        description    : $('#edit-gift-description').val(),
        tags        : $('#edit-gift-tags').val()
      }
    };

    API.editGift(giftId, params).then(function (data) {
      window.location.href = "/gifts/" + data.gift._id;
    }, errorHandler
    )
  })
});