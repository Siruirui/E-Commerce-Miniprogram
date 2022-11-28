# E-Commerce-Miniprogram
电子商务小程序——饮料点单

电商平台点单小程序，仅供学习使用。

本repo只含微信小程序前端，需要配合后端使用。
推荐搭配我的后端项目使用，移步[E-Commerce-Miniprogram-Server](https://github.com/Siruirui/E-Commerce-Miniprogram-Server)。
请求端口默认为localhost的8080端口，如需修改请直接在util.js中修改domain值。

- 存在问题：
1. 未实现存储用户头像功能。由于微信API的隐私策略更新，目前获取用户头像需要用户选择图片更换头像后，由小程序将头像图片上传至服务器中存储。由于本例仅用于学习，存储图片可能会占用较多服务器资源，因此暂未设计用户头像存储功能。
2. 前端登出后未请求服务器删除session；多个设备不同时间段登录时，先登录的设备会出现自动登录但服务器端session已更新，导致无法获取数据，需要重新登录的情况。可在登录时先进行一次session有效性检验。
3. 业务流程可拓展，分类订单状态；更多页面可完善，如odetail页（订单详情）、cservice页（客服）、setting页（小程序设置）、about页（关于）等；首页轮播图未绑定商品链接等。
