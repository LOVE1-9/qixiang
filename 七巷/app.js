//app.js

App({
  
  globalData: {
    userInfo: null,
    baseUrl:"http://120.79.45.185/images/"
  },


  //onLauch函数在微信小程序加载之后只会触发一次！
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //已进入小程序就登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if(res.code){
    //       wx.request({
    //         url:'http://localhost:80/login',
    //         data:{
    //           code:res.code
    //         },
    //         success(res){
              
             
              //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
             // var objstr = JSON.stringify(对象)
              //要将json字符串解析成json对象就用json.parse
              // var obj = JSON.parse(res.data.obj)
              // var user = {
              //   sessionKey:obj.session_key,
              //   openid:obj.openid
              // }



               // wx.request({
              //   url: 'http://localhost:80/User/insertUser',
              // })
            // console.log( this.globalData.userInfo)
              
             
              
    //         }
    //       })
    //     }else{
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  
  // 登录
  login:function(){
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if(res.code){
        wx.request({
          url:'http://120.79.45.185:801/login',
          method:"GET",
          
          data:{
            code:res.code
          }
        })
      }else{
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
})