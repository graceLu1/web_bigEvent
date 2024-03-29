$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击上传打开文件
    $('#btnChoose').on('click', function() {
        $('#file').click()
    })

    //更换裁剪的图片
    $('#file').on('change', function(e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return '请选择照片！'
        }

        //1.拿到用户的照片文件
        var file = e.target.files[0]

        //2.根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)

        //3.重新初始化图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //为确定按钮绑定事件
    $('#btnUpload').on('click', function() {
        //1.拿到更换后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //2.上传头像到服务器
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('头像更换失败')
                }
                layui.layer.msg('头像更换成功')

                //调用父元素index.js中的方法,重新渲染头像和昵称
                window.parent.getinfo()
            }
        })
    })
})