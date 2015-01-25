$(document).ready(function() {
  $('#uploadZip').on('submit', function(e) {
    $.post('/uploadRepo', new FormData(this), function(data, status){
      //Success handler
      console.log("submited!");
    });
    e.preventDefault();
  });
});