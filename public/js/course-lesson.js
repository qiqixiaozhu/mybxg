define(['jquery','template','util'],function($,template,util){
	//左侧菜单栏选中功能
	util.setMenu('/course/add');

	//获取课程id
	var csId=util.qs('cs_id');
	$.ajax({
		type : 'get',
		url : '/api/course/lesson',
		data : {cs_id : csId},
		dataType : 'json',
		success : function(data){
			if(data.code == 200){
				var html=template('lessonTpl',data.result);
				$('#lessonInfo').html(html);
			}
		}
	});
});