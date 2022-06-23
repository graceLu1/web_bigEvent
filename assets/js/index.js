$(function() {
    //获取用户信息
    getinfo()

    var layer = layui.layer
        //用户退出首页
    $('#index_loginout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地存储数据
            localStorage.removeItem('token')
                //2.跳转到登录页面
            location.href = './login.html'
            layer.close(index);
        })
    })
})

//获取用户信息
function getinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            //调用rebdenrAvatar渲染头像
            renderAvatar(res.data)
        },

        //无论成功还是失败最后都会调用complete函数
        // complete: function(res) {
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         //1.强制清空存储数据
        //         localStorage.removeItem('token')
        //             //2.强制跳转到登录页面
        //         location.href = './login.html'
        //     }
        // }
    })
}

//渲染头像
function renderAvatar(user) {
    //1.获取昵称
    var name = user.nickname || user.username
        //2.设置欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.渲染图片头像或文本头像
    if (user.user_pic !== null) {
        //3.1图片头像
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.avatar').hide()
    } else {
        //3.2文本头像
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.avatar').html(first).show()
    }
}