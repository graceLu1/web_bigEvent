$(function() {
    //自定义昵称规则
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '请输入1~6个字符！'
            }
        }
    })

    //初始用户基本信息
    initUserinfo()

    function initUserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status == !0) {
                    return layui.layer.msg('初始用户信息失败！')
                }
                //使用form.val()快速为表单赋值
                form.val('userinfo', res.data)
            }
        })
    }

    //表单重置
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserinfo()
    })

    //更新用户基本信息,监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                    // console.log(res);
                    // console.log($('.layui-form').serialize());

                //调用父元素index.js中的方法,重新渲染头像和昵称
                window.parent.getinfo()
                    // function crossOrigin() {
                    //     if (!document.getElementById("crossFrame")) {
                    //         var iframe = document.createElement("iframe")
                    //         iframe.setAttribute("style", "position:absolute;left:-9999px;top:-9999px")
                    //         iframe.setAttribute("src", '../../index/iframe.html')
                    //         document.body.appendChild(iframe)
                    //     } else {
                    //         document.getElementById('crossFrame').src = '../../index/iframe.html'
                    //     }
                    // }
            }
        })
    })
})