define(['jquery','template','cookie'],function($,template){
        // NProgress.start();

    // NProgress.done();

    //左侧菜单的切换
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    }); 
    
    //退出功能
    $("#logoutBtn").click(function(){
        $.ajax({
            type: 'post',
            url: '/api/logout',
            dataType: 'json',
            success: function(data){
                //console.log(data);
                if(data.code == 200){
                    location.href='/main/login';
                }
            }
        });
    });

    //判断是否登录
    var flag=$.cookie('PHPSESSID');
    if(!flag && location.pathname!='/main/login'){
        location.href='/main/login';
    }
    //登录成功 获取用户信息
    var loginInfo=$.cookie('loginInfo');
    loginInfo=loginInfo&&JSON.parse(loginInfo);

    var profile='<div class="avatar img-circle">\
                {{if tc_avatar}}\
                    <img src="{{tc_avatar}}">\
                {{else}}\
                    <img src="/public/images/default.png">\
                {{/if}}\
                </div>\
                <h4>布头儿</h4>';
    var html=template.render(profile,loginInfo||{});
    $('.aside .profile').html(html);

    // if(loginInfo){
    //     $('.aside profile img').attr('src',loginInfo.tc_avatar);
    //     $('.aside profile h4').html(loginInfo.tc_name);
    // }
     // $('.aside .profile img').attr('src',loginInfo.tc_avatar);
     // $('.aside .profile h4').html(loginInfo.tc_name);

});
