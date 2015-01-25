function replaceForm(repoID, fileName)
{
	console.log(repoID, fileName);
	$("#rename-title").html("Rename file: " + fileName);
	$("#renameFileForm").attr("action", "../fileEdit/rename/" + repoID + '/' + fileName);
	$('#modal-label').html("New file name (with ext.): ");
	$("#renameFile").modal("show");
}

function deleteConfirmForm(repoID, fileName)
{
	console.log(repoID, fileName);
	$("#rename-title").html("Are you sure?! Delete file: " + fileName);
	$("#renameFileForm").attr("action", "../fileEdit/delete/" + repoID + '/' + fileName);
	$("#modal-label").html("DELETE FILE!");
	$("#renameFile").modal("show");
}