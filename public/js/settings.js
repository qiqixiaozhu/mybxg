define(['jquery','template','ckeditor','uploadify','region','datepicker','language','validate','form'],function($,template,CKEDITOR){
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

			//提交表单
			$("#settingsForm").validate({
				sendForm : false,
				valid : function(){
					//获取并拼接籍贯
					var p=$('#p').find('option:selected').text();
					var c=$('#c').find('option:selected').text();
					var d=$('#d').find('option:selected').text();
					var hometown=p+'|'+c+'|'+d;
					
					//富文本编辑
					for(var instance in CKEDITOR.instances){
						CKEDITOR.instances[instance].updateElement();
					}
					//表单提交
					$(this).ajaxSubmit({
						type : 'post',
						url : '/api/teacher/modify',
						data : {tc_hometown:hometown},
						dataType : 'json',
						success : function(data){
							console.log(data);
							if(data.code == 200){
								location.reload();
							}
						}
					});
				}
			});
		}
	});
});