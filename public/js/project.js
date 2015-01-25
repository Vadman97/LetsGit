$('#uploadZip .btn').change(function() {
  $('#uploadZip').submit();
  $('label.addButton').html('');
  $('label.addButton').removeClass(); // removes all classes
  $('.row label').addClass('fa fa-refresh fa-lg fa-spin');
});