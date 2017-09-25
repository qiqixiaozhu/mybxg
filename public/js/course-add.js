define(['jquery','template','util','form'],function($,template,util){
	//左侧菜单栏选中功能
	util.setMenu(location.pathname);

	$('#courseBtn').click(function(){
		$('#courseForm').ajaxSubmit({
			type : 'post',
			url : '/api/course/create',
			dataType : 'json',
			success : function(data){
				// console.log(123);
				if(data.code == 200){
					location.href='/course/basic?cs_id='+data.result.cs_id;
				}
			}
		});
	});
});