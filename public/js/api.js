var API_WRAPPER = function(){

  this.URL_BASE = window.location.origin;

  this.getSecret = function(){
    return $.ajax({
      method: 'GET',
      url   : this.URL_BASE + '/secret',
    })
  };

  this.getAllGifts = function(searchWord){
    var urlQuery = searchWord ? "?search=" + searchWord : "";

    return $.ajax({
      type: 'GET',
      url : this.URL_BASE + '/api/gifts' + urlQuery,
    })
  }

  this.getOneGift = function(giftId){
    return $.ajax({
      type: 'GET',
      url : this.URL_BASE + '/api/gifts/' + giftId
    })
  }

  this.createGift = function(params){
    return $.ajax({
      type: 'POST',
      url   : this.URL_BASE + '/api/gifts',
      data: params
    })
  }

  this.editGift = function(giftId, params) {
    return $.ajax({
      type : "PUT",
      url  : this.URL_BASE + "/api/gifts/" + giftId,
      data : params
    });
  };

  this.deleteGift = function(giftId) {
    return $.ajax({
      type : "DELETE",
      url  : this.URL_BASE + "/api/gifts/" + giftId
    })
  }

  this.getAllLists = function(searchWord){
    var urlQuery = searchWord ? "?search=" + searchWord : "";

    return $.ajax({
      type : 'GET',
      url  : this.URL_BASE + '/api/mylist' + urlQuery
    })
  }

  this.addToList = function(params){
    return $.ajax({
      type : 'POST',
      url  : this.URL_BASE + '/api/mylist',
      data : params
    })
  }

  this.deleteList = function(listId) {
    return $.ajax({
      url  : this.URL_BASE + "/api/mylist/" + listId,
      type : "DELETE"
    })
  }

}

var API = new API_WRAPPER;
