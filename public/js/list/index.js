$(function(){
  getLists();

  $("#list-search").on("submit", getLists);
})

function getLists(e){
  if (e)  e.preventDefault();

  var searchWord = $('#list-input').val();
  console.log(searchWord)

  API.getAllLists(searchWord).then(function(lists){
    console.log(lists);

    //EMPTY div first
    $('#list-container').html('');

    //Populate list Data
    lists.forEach(function(list){
      $('#list-container').append(
        '<div class="col-xs-6 portfolio-item well"> <h2>' +
        list.gift.name +'</h2><h4> Quantity: ' +
        list.quantity +'</h4><h4> Recipient: ' +
        list.recipient +'</h4><a href="/mylist/' +
        list._id +
        '/delete" class="btn btn-info h4"> Delete </a></div>'
      )
    })
  }, errorHandler)
}
