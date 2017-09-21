define(['jquery','template'],function($,template){
	$.ajax({
		type:'get',
		url:'/api/teacher',
		dataType:'json',
		success:function(data){
			console.log(data);
			//填充数据
			var html=template('teacherTpl',data);
			$("#teacherInfo").html(html);

			//启用、注销讲师
			$(".eod").click(function(){
				var that=this;
				//获取点击按钮的父元素td
				// var td=$(this).parent();
				var td=$(this).closest('td');
				//获取讲师ID
				var tcId=td.attr('data-tcId');
				//获取讲师状态
				var tcStatus=td.attr('data-status');

				//发送请求 调用接口
				$.ajax({
					type : 'post',
					url : '/api/teacher/handle',
					data : {
						tc_id : tcId,
						tc_status : tcStatus
					},
					dataType : 'json',
					success : function(data){
						console.log(data);
						if(data.code == 200){
							td.attr('data-status',data.result.tc_status);
							if(data.result.tc_status == 0){
								console.log('注销');
								$(that).text('注销');
							}else{
							
								$(that).text('启用');
							}
						}
					}
				});
			});
		}
	});
});