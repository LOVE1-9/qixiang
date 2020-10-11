// pages/package/package.js

const app = getApp();
var baseUrl = app.globalData.baseUrl;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    firstPicUrl:"",
    imageUrl:{},
    price:"待定",
    deposit:"待定",
    packageName:"加载中...",
    description:"暂无服务详情，请咨询店家，了解详细情况",
    careAbout:"暂无注意事项",
    choiceId:null,
    packageObject:{}
   
  },
  onClickReserve(){
    
    wx.navigateTo({
      url: '../reserve/reserve',
    })
  },
  //遮罩层
  onClickShow() {
    console.log("success");
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },

  noop() {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  
    var params = JSON.parse(options.params)
    //注意：由于我在对接上个页面前就写好这个，就又重新的根据传过来的id去请求后端，获取内容
    //由于我现在弄得是吧这个页面的内容当做一个对象传到这里来，所以可以直接使用里面的内容，就不用重新去调用接口获取值，有时间可以改一下，性能会更好
    wx.request({
      url: 'http://120.79.45.185:801/Choice/selectById',
      data:{
        id:params.id
      },
      success(res){
        var myPackage = res.data.obj;
        that.setData({
          imageUrl:{
            "1":baseUrl+myPackage.packPhotoName1,
            "2":baseUrl+myPackage.packPhotoName2,
            "3":baseUrl+myPackage.packPhotoName3,
            "4":baseUrl+myPackage.packPhotoName4,
            "5":baseUrl+myPackage.packPhotoName5,
            "6":baseUrl+myPackage.packPhotoName6,
            "7":baseUrl+myPackage.packPhotoName7,
            "8":baseUrl+myPackage.packPhotoName8
          },
          firstPicUrl:baseUrl+myPackage.packPhotoName1,
          packageName:myPackage.name,
          description:myPackage.description,
          price:myPackage.price,
          deposit:myPackage.deposit,
          careAbout:myPackage.careAbout,
          packageObject:params,
          choiceId:myPackage.id
        })
      }
      
    })
    
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