define(['jquery','template','util','uploadify'],function($,template,util){
	//左侧菜单栏选中功能
	util.setMenu('/course/add');

	//获取课程id
	var csId=util.qs('cs_id');
	//课程封面信息
	$.ajax({
		type : 'get',
		url : '/api/course/picture',
		data : {cs_id:csId},
		dataType : 'json',
		success : function(data){
			if(data.code == 200){
				var html=template('pictureTpl',data.result);
				$('#pictureInfo').html(html);

				//图片上传
				$('#myfile').uploadify({
					width : 70,
					height : 'auto',
					buttonText : '选择图片',
					itemTemplate : '<span></span>',
					buttonClass : 'btn btn-success btn-sm',
					swf : '/public/assets/uploadify/uploadify.swf',
					uploader : '/api/uploader/cover',
					fileObjName : 'cs_cover_original',
					formData : {cs_id:csId},
					onUploadSuccess : function(a,b){
						// console.log(b);
						var obj=JSON.parse(b);
						$('.preview img').attr('src',obj.result.path);
					}
				});
			}
		}
	});
});