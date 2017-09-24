define(['jquery','template','util','bootstrap'],function($,template,util){
	//左侧菜单栏选中功能
	util.setMenu(location.pathname);
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

			//查看讲师
			$(".preview").click(function(){
				var td=$(this).closest('td');
				var tcId=td.attr('data-tcId');
				//数据请求 调用接口
				$.ajax({
					type : 'get',
					url : '/api/teacher/view',
					data : {tc_id:tcId},
					dataType : 'json',
					success : function(data){
						console.log(data);
						if(data.code == 200){
							var html=template('modalTpl',data.result);
							$("#teacherModal #modalInfo").html(html);
							$("#teacherModal").modal();
						}
					}
				});
			});

		}
	});
});