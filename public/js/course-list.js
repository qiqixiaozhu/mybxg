define(['jquery','template','util'],function($,template,util){
	//左侧菜单栏选中功能
	util.setMenu(location.pathname);

	//调用接口 请求数据
	$.ajax({
		type : 'get',
		url : '/api/course',
		dataType : 'json',
		success : function(data){
			// console.log(data);
			var html=template('courseTpl',{list:data.result});
			// console.log(html);
			$('#courseInfo').html(html);
		}
	});
});