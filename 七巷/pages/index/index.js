//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '未登录，请点击头像进行登录',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
  
   //点击就登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            url:'http://120.79.45.185:801/login',
            data:{
              code:res.code
            },
            success(res){

             // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。====>一般在发送数据的时候
             //var objstr = JSON.stringify(对象)
              //要将json字符串解析成json对象就用json.parse=====>一般在接收数据的时候
              var obj = JSON.parse(res.data.obj)  
              //保留在本地缓存
              wx.setStorageSync('localOpenid', obj.openid)
              
              var user = {
                openid:obj.openid,
                wecharName:app.globalData.userInfo.nickName,
                phone:null,
                gender:app.globalData.userInfo.gender,
                userCity:app.globalData.userInfo.city
              }


               wx.request({
                url: 'http://120.79.45.185:801/User/insertUser',
                method:"POST",
                header:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                data:{
                  user:JSON.stringify(user)
                },
                
              })
        
            }
          })
        }else{
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.switchTab({
      url: '../my/my',
    })
  },
  onLoad: function () {
    //在首页加载的时候判断登录是否过期
    wx.checkSession({
      success: (res) => {
        //登录没过期，直接跳转到首页
        wx.switchTab({
          url: '../homePage/homePage',
        })
      },
      fail:(res) => {
        //登录过期，就得让用户重新登录
        if (app.globalData.userInfo) {
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        } else if (this.data.canIUse){
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
