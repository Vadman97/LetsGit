function replaceForm(userID, fileName)
{
	console.log(userID, fileName);
	$("#rename-title").html("Rename file: " + fileName);
	$("#renameFileForm").attr("action", "../fileEdit/rename/" + userID + '/' + fileName);
	$('#modal-label').html("New file name (with ext.): ");
	$("#renameFile").modal("show");
}

function deleteConfirmForm(userID, fileName)
{
	console.log(userID, fileName);
	$("#rename-title").html("Are you sure?! Delete file: " + fileName);
	$("#renameFileForm").attr("action", "../fileEdit/delete/" + userID + '/' + fileName);
	$("#modal-label").html("DELETE FILE!");
	$("#renameFile").modal("show");
}