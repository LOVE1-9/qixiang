// pages/reserve/reserve.js

import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    ruleShow:false,
    judgeCheckbox:[],
    reserveTime:"请选择服务时间",
    reserveCopyTime:[],
    choiceName:"加载错误，请稍后再试",
    reserveName:"",
    phone:"",
    notes:"",
    message:"请修改",

    minHour: 0,
    maxHour: 24,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),

  },

  //点击单选宽的事件
  checkboxChange(e){
    this.setData({
      judgeCheckbox:e.detail.value
    })
  },
  lookRule(){
    this.setData({
      ruleShow:true
    })
  },
  closeLookRule(){
    this.setData({
      ruleShow:false
    })
  },
//立即预约的点击事件
  onclickSubmit(){
      //用正则来判断手机号1--以1为开头；
      //2--第二位可为3,4,5,7,8,中的任意一位；
      //3--最后以0-9的9个整数结尾。
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if(this.data.choiceName == "加载中..."){
        this.setData({
          message:"小程序出错啦，请稍后再预约"
        })
        Dialog.alert({
          title: '出错啦',
          message: this.data.message,
          theme: 'round-button',
        }).then(() => {
          // on close
        });
      }else if(this.data.reserveTime == "undefined-undefined-undefined undefined:undefined:00" || this.data.reserveTime =="请选择服务时间"){
       this.setData({
        message:"请选择服务时间"
      })
      Dialog.alert({
        title: '出错啦',
        message: this.data.message,
        theme: 'round-button',
      }).then(() => {
        // on close
      });
      }else if(this.data.reserveName == "" || this.data.reserveName == null){
        this.setData({
          message:"请输入您的姓名"
        })
        Dialog.alert({
          title: '出错啦',
          message: this.data.message,
          theme: 'round-button',
        }).then(() => {
          // on close
        });
      }else if(!myreg.test(this.data.phone)){
      this.setData({
        message:"您输入的电话号码无效，请重新输入"
      })
      Dialog.alert({
        title: '出错啦',
        message: this.data.message,
        theme: 'round-button',
      }).then(() => {
        // on close
      });
    }else if(this.data.judgeCheckbox.length == 0){
      Dialog.alert({
        title: '请同意用户服务协议',
        message: "请阅读用户服务协议并勾选",
        theme: 'round-button',
      }).then(() => {
        // on close
      });
    }else{
      wx.navigateTo({
        url: '../payPage/payPage',
      })
    }
  },

  //弹出层
 
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  makePhone(){
    wx.makePhoneCall({
      phoneNumber: '18476203757' //仅为示例，并非真实的电话号码
    })
  },
  
  //时间选择组件的方法
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onConfirm(event){
    if(this.data.reserveCopyTime[0] != "undefined" && this.data.reserveCopyTime[0] != null){
      this.setData({
        reserveTime:this.data.reserveCopyTime[0]+"-"+this.data.reserveCopyTime[1]+"-"+this.data.reserveCopyTime[2]+" "+this.data.reserveCopyTime[3]+":"+this.data.reserveCopyTime[4]+":"+"00"
      })
    }
    
  },
  onChange(e){
    
  this.setData({
    reserveCopyTime:e.detail.getValues(),
  }) 
  },

  //预留信息的inputs事件
  inputName(event){
    this.setData({
      reserveName:event.detail.value
    })
  },
  inputPhone(event){
    this.setData({
      phone:event.detail.value
    })
  },
  inputNotes(event){
    this.setData({
      notes:event.detail.value
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取所有的页面
    let allPage = getCurrentPages();
    //获取上一个页面
    let lastPage = allPage[allPage.length-2];
    this.setData({
      choiceName:lastPage.data.packageName
    })
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