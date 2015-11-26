$(function(){

  API.getAllLists().then(function(data){
    data.lists.forEach(function(list){
      console.log(list)
      $('#list-container').append(
        '<div class="col-xs-6 portfolio-item well"> <h2>' +
        list.gift.name +'</h2><h4> Quantity: ' +
        list.quantity +'</h4><h4> Recipient: ' +
        list.recipient +'</h4><a href="/mylist/' +
        list._id +
        '/delete" class="btn btn-info h4"> Delete </a></div>'
      )
    })
  }, errorHandler
  )
})
