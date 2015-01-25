var editor = ace.edit("editor");

var readOnly = true;
setReadOnly(readOnly);

editor.setTheme("ace/theme/clouds");
editor.setAutoScrollEditorIntoView(true);
editor.setOption("maxLines", 50);
editor.setOption("minLines", 2);
editor.setShowPrintMargin(false);

// set mode
var modelist = ace.require('ace/ext/modelist');
var mode = modelist.getModeForPath(document.URL).mode;
editor.session.setMode(mode);

// val=true to set read only, val=false for write mode
function setReadOnly(val) {
  readOnly = val;
  editor.setReadOnly(val);
  editor.setHighlightActiveLine(!val); // don't highlight active line
  editor.getSession().setUseWorker(!val); // disable warnings
  editor.setShowFoldWidgets(!val); // don't fold code
  $('.ace_scroller').css('background-color', val ? '#eee' : 'inherit');
  var editBtn = $('.btn-edit');
  if(val) {
    editBtn.removeClass('fa-check');
    editBtn.addClass('fa-pencil-square-o');
    // save changed text
    $.post(document.URL + '/save', {text: editor.getValue()}, function(data) {
      console.log('saved');
    });
  } else {
    editBtn.removeClass('fa-pencil-square-o');
    editBtn.addClass('fa-check');
  }
}

function toggleReadOnly() {
  setReadOnly(!readOnly);
}

$('.btn-edit').click(function() {
  toggleReadOnly();
});