define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
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
			
				var html=template('pictureTpl',data.result);
				$('#pictureInfo').html(html);

				var img=$('.preview img');
				var nowCrop=null;
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

						cropImg();
						$('#cropBtn').text('保存图片').attr('data-flag',true);
					}
				});

				//图片裁切
				$('#cropBtn').click(function(){
					var flag=$(this).attr('data-flag');
					if(flag){
						$('#cropForm').ajaxSubmit({
							type : 'post',
							url : '/api/course/update/picture',
							data : {cs_id : csId},
							dataType : 'json',
							success : function(data){
								if(data.code == 200){
									location.href='/course/lesson?cs_id='+data.result.cs_id;
								}
							}
						});
					}else{
						$(this).text('保存图片').attr('data-flag',true);
						cropImg();
					}
				});

				//封装裁切图片方法
				function cropImg(){
					img.Jcrop({
						aspectRatio : 2,
					},function(){
						nowCrop && nowCrop.destroy();
						nowCrop=this;
						//缩略图显示
						this.initComponent('Thumbnailer',{width : 240,height :120,mythumb : '.thumb'});
						// console.log(this);

						//获取图片宽度
						var width=this.ui.stage.width;
						//获取图片高度
						var height=this.ui.stage.height;

						//选区数据
						var x=0;
						var y=(height-width/2)/2;
						var w=width;
						var h=width/2;
						//创建选区
						this.newSelection();
						this.setSelect([x,y,w,h]);

					});

					//图片区域
					img.parent().on('cropstart cropmove cropend',function(a,b,c){
						var inputs=$('#cropForm').find('input');
						inputs.eq(0).val(c.x);
						inputs.eq(1).val(c.y);
						inputs.eq(2).val(c.w);
						inputs.eq(3).val(c.h);
					})
				}
			
		}
	});
});