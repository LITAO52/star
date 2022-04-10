// 登录个注册之间的切换
$("#link_logn").on("click",function(){
  $(".resBox").show();
  $(".loinBox").hide();
})
$("#link_res").on("click",function(){
  $(".resBox").hide();
  $(".loinBox").show();
})


// 自定义表单的验证规则
// 获取layui的对象
var form = layui.form;
var layer = layui.layer;
// 调用verify方法自定义验证规则
form.verify({
  // 匹配不可以出现空格和位数必须到6至12位
  pwd:[
    /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
  ],
  repwd:function(value){
    // 获取请输入密码框的类容
    // []表示属性
    var repwd = $(".resBox [name=password]").val()
    if(repwd != value){
      return "两次输入的密码不一样"
    }
  }
})

// 注册账号
$("#resub").on("submit",function(e){
  e.preventDefault()
  $.post("http://www.liulongbin.top:3007/api/reguser",{
  username:$(".resBox [name=username]").val(),
  password:$(".resBox [name=password]").val()
  },
  function(res){
    // alert(res.message)
    if(res.status == 0){
      // console.log("注册成功");
      layer.msg("注册成功,请登录")
      console.log(res);
      // 自动点击去登陆标签
      $("#link_res").click()
    }
    else{
      layer.msg(res.message)
    }
  })
})

// 登录账号的验证
$('#sub').submit(function (e) {
  // 阻止默认提交行为
  e.preventDefault()
  $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data:$("#sub").serialize(),
      // dataType : 'JSON',
      success:function (res) {
       console.log($("#sub").serialize());
       console.log(res);
       console.log(res.status);
          if (res.status !== 0) {
              return layer.msg('登录失败!')
          }
          layer.msg('登录成功！')
          // 将登录成功得到的 token 字符串，保存到 localStorage 中
          localStorage.setItem('token', res.token)
          // 跳转到后台主页
          location.href = 'index.html'
      }
  })
})
