$(document).ready(function() {
  $('#uploadZip').on('submit', function(e) {
    $.post('/uploadRepo', null, function(data, status){
      //Success handler
      console.log("submited!");
    });
    e.preventDefault();
  });
});