$(function() {
    // 登录与注册切换
    $('#link-reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取layui内置
    var form = layui.form
    var layer = layui.layer
        // 自定义密码要求
    form.verify({
        psw: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repsw: function(value) {
            var val = $('.reg-box [name=password]').val()
            if (val !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册接口
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                $('#link-login').click()
            })
    })

    // 监听登录接口
    $('#form-login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！');
                // 储存token信息 用于权限访问
                localStorage.setItem('token', res.token)
                    // 跳转页面
                location.href = '/index.html'
            }
        })
    })
})