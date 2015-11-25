var API_WRAPPER = function(){

  this.URL_BASE = window.location.origin;

  this.getSecret = function(){
    return $.ajax({
      method: 'GET',
      url: this.URL_BASE + '/secret',
    })
  };

  this.getAllGifts = function(){
    return $.ajax({
      type: 'GET',
      url: this.URL_BASE + '/api/gifts'
    })
  }

  this.getOneGift = function(giftId){
    return $.ajax({
      type: 'GET',
      url: this.URL_BASE + '/api/gifts/' + giftId
    })
  }

  this.createGift = function(params){
    return $.ajax({
      method: 'POST',
      url: this.URL_BASE + '/api/gifts',
      data: params
    })
  }

}

var API = new API_WRAPPER;
