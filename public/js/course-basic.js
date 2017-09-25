define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
	//左侧菜单栏选中功能
	util.setMenu('/course/add');

	//获取课程ID
	var csId=util.qs('cs_id');
	//获取flag
	var flag=util.qs('flag');
	//console.log(csId);
	//调用接口 请求数据
	$.ajax({
		type : 'get',
		url : '/api/course/basic',
		data : {cs_id:csId},
		dataType : 'json',
		success : function(data){
			//console.log(data);
			if(flag){
				data.result.operate='课程编辑';
			}else{
				data.result.operate='课程添加';
			}

			//页面填充
			var html=template('basicTpl',data.result);
			$('#basicInfo').html(html);

			//课程描述富文本
			CKEDITOR.replace('editor',{
				toolbarGroups:[
					{name:'clipboard',groups:['clipboard','undo']},
					{name:'editing',groups:['find','selection','spellchecker','editing']}
				]
			});
			for(var instance in CKEDITOR.instances){
				CKEDITOR.instances[instance].updateElement();
			}

			//分类的下拉联动
			$('#firstType').change(function(){
				//获取一级分类ID
				var pid=$(this).val();
				// console.log(pid);
				$.ajax({
					type : 'get',
					url : '/api/category/child',
					data : {cg_id : pid},
					dataType : 'json',
					success : function(data){
						var tpl='<option value="">请选择二级分类...</option>\
                                {{each list}}\
                                <option value="{{$value.cg_id}}">{{$value.cg_name}}</option>\
                                {{/each}}';
                        var html=template.render(tpl,{list:data.result});
                        $('#secondType').html(html);
					}
				});
			});

			//处理表单提交
			$('#basicForm').validate({
				sendForm : false,
				valid : function(){
					$(this).ajaxSubmit({
						type : 'post',
						url : '/api/course/update/basic',
						data : {cs_id : csId},
						dataType : 'json',
						success : function(data){
							if(data.code == 200){
								location.href='/course/picture?cs_id='+data.result.cs_id;
							}
						}
					});
				}
			});
		}
	});
});