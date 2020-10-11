// pages/homePage/homePage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://120.79.45.185/images/photo1 (3).webp',
      'http://120.79.45.185/images/photo1 (1).webp',
      'http://120.79.45.185/images/photo1 (2).webp',
      'http://120.79.45.185/images/photo1 (2).webp'
    ],
    customerPic:[],
    packagePicUrls:[],
    judgeHidden:true,
    choiceList:{},
    allObject:[],
    packageObject1:{},
    packageObject2:{},
    packageObject3:{},
    packageObject4:{},
    baseUrl:app.globalData.baseUrl,
    swiperIdx: 0
  },
//套餐服务点击事件
clickChoicPhoto(event){
  wx.navigateTo({
    url: "../package/package?params=" + JSON.stringify(event.currentTarget.dataset.packageObject),
  })
},
//遮罩层点击事件
  setHidden(){
    this.setData({
      judgeHidden:true
    })
  },

  bindchange(e) {
    this.setData({
      swiperIdx: e.detail.current
    })
  },
  copyWxName(){
    wx.setClipboardData({
      data: '18476203757',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  copyTikTok(){
    wx.setClipboardData({
      data: 'TikTok',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  makePhone(){
   
    wx.makePhoneCall({
      phoneNumber: '18476203757' //仅为示例，并非真实的电话号码
      
    })
  },
  makeWechat(){   
    this.setData({
      judgeHidden:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://120.79.45.185:801/Choice/getChoiceList',
      method:"GET",
      success:(res)=>{
        var object = [];
        for(var i=0;i<res.data.obj.length;i++){
          object[i] = res.data.obj[i]
        }
    
        that.setData({
          allObject:res.data.obj,
          packageObject1:object[0],
          packageObject2:object[1],
          packageObject3:object[2],
          packageObject4:object[3],
          choiceList:res.data.obj
        })
       
      }
      
      
    })

    

    // wx.showLoading({
    //   title: '加载中，请稍等',
    // }),
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    
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