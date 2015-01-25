$('#upload-submit').click(function() {
  //$('#addRepositoryForm').submit();
  $.post('/clone', $('#addRepositoryForm').serialize(), function(data) {
    location.reload();
  }, 'json');
  $('#addRepositoryForm').parent().html('This may take a while...<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>');
});

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});