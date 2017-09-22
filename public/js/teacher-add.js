define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util){
	var tcId=util.qs('tc_id');
	if(tcId){
		//编辑讲师
		$.ajax({
			type : 'get',
			url : '/api/teacher/edit',
			data : {tc_id:tcId},
			dataType : 'json',
			success : function(data){
				console.log(data);
				data.result.operate='讲师编辑';
				var html=template('teacherTpl',data.result);
				$('.main #teacherInfo').html(html);

				submitForm('/api/teacher/update');
			}
		});
	}else{
		//添加讲师
		var html=template('teacherTpl',{operate:'讲师添加'});
		$('.main #teacherInfo').html(html);

		submitForm('/api/teacher/add');
	}

	//提交表单操作
	// function submitForm(url){
	// 	$('#teacherBtn').click(function(){
	// 		$.ajax({
	// 			type:'post',
	// 			url:url,
	// 			data:$("#teacherForm").serialize(),
	// 			dataType:'json',
	// 			success:function(data){
	// 				if(data.code == 200){
	// 					location.href='/teacher/list';
	// 				}
	// 			}
	// 		});
	// 	});
	// }

	function submitForm(url){
		$('#teacherForm').validate({
			sendForm:false,
			valid:function(){
				$(this).ajaxSubmit({
					url:url,
					dataType:'json',
					success:function(data){
						if(data.code == 200){
							location.href='/teacher/list';
						}
					}
				});
			},
			description:{
				tcName:{required:'用户名不能为空'},
				tcPass:{required:'密码不能为空',pattern:'密码为六位数'},
				tcJoinDate:{required:'日期不能为空'}
			}
		});
	}
});