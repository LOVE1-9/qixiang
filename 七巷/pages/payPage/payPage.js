import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:"http://120.79.45.185/images/photo1 (3).webp",
    choiceName:"出错啦",
    price:"出错啦",
    deposit:0,
    reserveName:"出错啦，加载不出来",
    phone:"出错啦，加载不出来",
    reserveTime:"出错啦，加载不出来",
    notes:"无"
  },

  //支付,由于是个人号，无法调用微信支付接口，因此这次就模拟支付就好
  onSubmit(e){
    //首先验证微信登录过期没
    wx.checkSession({
      success: (res) => {
        if(this.data.deposit == 0){
          Dialog.alert({
            title: '出错啦',
            message: '支付失败，请稍后再试',
          }).then(() => {
            // on close
          });
        }else{
          var allPages = getCurrentPages();
          var lastPage = allPages[allPages.length - 2];
          var lastTwoPage = allPages[allPages.length - 3];
          var order = {
            //id:null,
            picUrl:lastTwoPage.data.firstPicUrl,
            openId: wx.getStorageSync('localOpenid') ,
            choiceId:lastTwoPage.data.choiceId ,
            reserveName: this.data.reserveName,
            phone: this.data.phone,
            reserveTime:this.data.reserveTime ,
            startTime: util.formatTime(new Date()),
            //endTime: "",
            status: 0,
            payStatus: 1,
            notes: this.data.notes
          }
          wx.request({
            url: 'http://120.79.45.185:801/Orders/insertOrder',
            method:"POST",
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            data:{
              order:JSON.stringify(order)
            },
            success:(res)=>{
              // wx.switchTab({
              //   url: '../order/order'
              // })
              wx.navigateTo({
                url: '../order/order',
              })
          
            }
          })
          
         
        }
        
      },
      fail:()=>{
        // session_key 已经失效，需要重新执行登录流程
        app.login() //重新登录
         //保留在本地缓存
         var obj = JSON.parse(res.data.obj) 
         wx.setStorageSync('localOpenid', obj.openid)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var allPages = getCurrentPages();
    var lastPage = allPages[allPages.length - 2];
    var lastTwoPage = allPages[allPages.length - 3];

    this.setData({
      picUrl:lastTwoPage.data.firstPicUrl,
      choiceName:lastPage.data.choiceName,
      price:lastTwoPage.data.price,
      deposit:lastTwoPage.data.deposit,
      reserveName:lastPage.data.reserveName,
      phone:lastPage.data.phone,
      reserveTime:lastPage.data.reserveTime,
      notes:lastPage.data.notes
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})