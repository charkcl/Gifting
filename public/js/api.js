var API_WRAPPER = function(){

  this.URL_BASE = window.location.origin;

  this.getSecret = function(){
    return $.ajax({
      method: 'GET',
      url: this.URL_BASE + '/secret',
    })
  };
}

var API = new API_WRAPPER;
