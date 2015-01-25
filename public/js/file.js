var editor = ace.edit("editor");
editor.setTheme("ace/theme/clouds");
editor.getSession().setMode("ace/mode/javascript");
editor.setAutoScrollEditorIntoView(true);
editor.setOption("maxLines", 30);
editor.setOption("minLines", 2);
editor.setShowPrintMargin(false);

// val=true to set read only, val=false for write mode
function setReadOnly(val) {
  editor.setReadOnly(val);
  editor.setHighlightActiveLine(!val); // don't highlight active line
  editor.getSession().setUseWorker(!val); // disable warnings
  editor.setShowFoldWidgets(!val); // don't fold code
  $('.ace_scroller').css('background-color', val ? '#eee' : 'inherit');
}