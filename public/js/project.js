$('#uploadZip .btn').change(function() {
  $('#uploadZip').submit();
  $('label.addButton').html('');
  $('label.addButton').removeClass(); // removes all classes
  $('.row label').addClass('fa fa-refresh fa-lg fa-spin');
});

$(document).ready(function() {
  $('#pushRepo').on('click', function() {
    var username = prompt('Username?');
    var password = prompt('Password?');

    $.get('/pushRepo/' + id + '?username=' + username + '&password=' + password, function(data) {
    });
  });
});
