
NProgress.start();

NProgress.done();

$('.navs ul').prev('a').on('click', function () {
	$(this).next().slideToggle();
});	
	
$("#logoutBtn").click(function(){
            $.ajax({
                type: 'post',
                url: '/api/logout',
                dataType: 'json',
                success: function(data){
                    console.log(data);
                    if(data.code == 200){
                        location.href='/main/login';
                    }
                }
            });
        });

var flag=$.cookie('PHPSESSID');
if(!flag){
   location.href='/main/login';
}
var loginInfo=$.cookie('loginInfo');
loginInfo=loginInfo&&JSON.parse(loginInfo);
$('.aside profile img').attr('src',loginInfo.tc_avatar);
$('.aside profile h4').html(loginInfo.tc_name);        