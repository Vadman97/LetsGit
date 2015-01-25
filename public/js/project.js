$('#uploadZip .btn').change(function() {
  $.post('/uploadRepo', $('#uploadZip').serialize(), function(data) {
    location.reload();
  }, 'json');
  $('label.addButton').html('');
  $('label.addButton').removeClass(); // removes all classes
  $('.row label').addClass('fa fa-refresh fa-lg fa-spin');
});