define(['jquery','template','ckeditor','uploadify','region','datepicker','language'],function($,template,CKEDITOR){
	$.ajax({
		type:'get',
		url:'/api/teacher/profile',
		dataType:'json',
		success:function(data){
			var html=template('settingsTpl',data.result);
			$('#settingsInfo').html(html);

			//上传头像
			$("#upfile").uploadify({
				width : 120,
				height : 120,
				buttonText : '',
				itemTemplate : '<span></span>',
				fileObjName : 'tc_avatar',
				swf : '/public/assets/uploadify/uploadify.swf',
				uploader : '/api/uploader/avatar',
				onUploadSuccess : function(a,b){
					var obj=JSON.parse(b);
					console.log(obj);
					$(".preview img").attr('src',obj.result.path);
				}
			});

			//省级联动
			$("#pcd").region({
				url : '/public/assets/jquery-region/region.json'
			});

			//富文本
			CKEDITOR.replace('editor',{
				toolbarGroups:[
				{name:'clipboard',groups:['clipboard','undo']},
				{name:'editing',groups:['find','selection','spellchecker','editing']}
				]
			});
		}
	});
});