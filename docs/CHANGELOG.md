### 2017/12/28

调查了一些qq robot的库，大多数使用python写的，少数使用js开发的，安装了一个js的库，由于代码提交时间距现在至少2年以上，时过境迁qq的协议也可能发生了改变，QQ模拟登陆失败。robot这块先暂停一段落，有空继续研究。

然后验证实现了禅道模拟登陆和自动提交bug的流程，基本上实现了demo。

### 2017/12/29

继续测试禅道自动提交bug，发现关键字段为zentaosid，需要登录后在response的cookie获取。
如果sid过期，返回的text为
```html
<html><meta charset='utf-8'/><style>body{background:white}</style><script>self.location='/zentao/user-login-L3plbnRhby9idWctY3JlYXRlLTM5LTAtbW9kdWxlSUQ9MC5odG1s.html';

</script>
```
意思是重定向到登录页，如果如此返回，则需要重新模拟登陆获取sid

如果提交bug成功，则返回
```html
 <html><meta charset='utf-8'/><style>body{background:white}</style><script>self.location='/zentao/bug-browse-38-0-byModule-0.html';

</script>


```

另外 qqbot 这个库不错，就是需要每天扫码登录。听说能发邮件提醒，有待调查。另一个缺点是不能处理图片

### 2018/1/9
今天虽然初版做完了，和测试沟通后，发现不能处理图片是个硬伤，所以此项目也就到此为止了
