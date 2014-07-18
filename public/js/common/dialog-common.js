$(document).ready(function(){
	$("#newDailogTitle",parent.document).val($(document).attr("title"));
	$("#upDailogTitleBtn",parent.document).click();
	
	//定义返回按钮
	$(".backBtn").unbind();
	$(".backBtn").click(function(){
		history.back();
		return false;
	});
	
	$(".closeBtn").click(function(){
		$("#closeDailogBtn",parent.document).click();	
	});
});