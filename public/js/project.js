$(document).ready(function() {
  $('#uploadZip').on('submit', function(e) {
    var formData = new FormData();
    formData.append("file", $('#uploadInput')[0].files[0]);

    var request = new XMLHttpRequest();
    request.open("POST", '/uploadRepo');
    request.send(formData);
    e.preventDefault();
  });
});