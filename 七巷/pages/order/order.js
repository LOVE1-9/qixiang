// pages/order/order.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    allOrdersList:[],
    allNotPayOrdersList:[],
    allDoingOrdersList:[],
    allFinishOrdersList:[],
    allCancelOrdersList:[],
    baseUrl:app.globalData.baseUrl,
  },

  onclick(event){
    var that = this;
    
    switch(event.detail.title){
      case "全部":
        wx.request({
          url: 'http://120.79.45.185:801/Orders/selectAllSpecificOrdersByOpenid',
          data:{
            openid:wx.getStorageSync('localOpenid')
          },
          success:(res)=>{
          
          that.setData({
            allOrdersList:res.data.obj
          })
          },
          fail:()=>{
          console.log("查询所有订单失败")
          }
          
        });
        case "未付款":
          wx.request({
            url: 'http://120.79.45.185:801/Orders/seleceAllNotPayOrdersByOpeinid',
            data:{
              openid:wx.getStorageSync('localOpenid')
            },
            success:(res)=>{
            that.setData({
              allNotPayOrdersList:res.data.obj
            })
            },
            fail:()=>{
            console.log("查询所有未付款订单失败")
            }
            
          });
        break;
      break;
      case "进行中":
        wx.request({
          url: 'http://120.79.45.185:801/Orders/selectAllDoingOrdersByOpenid',
          data:{
            openid:wx.getStorageSync('localOpenid')
          },
          success:(res)=>{
          that.setData({
            allDoingOrdersList:res.data.obj
          })
          },
          fail:()=>{
          console.log("查询所有进行中订单失败")
          }
          
        });
      break;
      case "已完成":
        wx.request({
          url: 'http://120.79.45.185:801/Orders/seleceAllFinishOrdersByOpeinid',
          data:{
            openid:wx.getStorageSync('localOpenid')
          },
          success:(res)=>{
          that.setData({
            allFinishOrdersList:res.data.obj
          })
          },
          fail:()=>{
          console.log("查询所有已完成订单失败")
          }
          
        });
      break;
      case "已取消":
        wx.request({
          url: 'http://120.79.45.185:801/Orders/seleceAllCancelOrdersByOpeinid',
          data:{
            openid:wx.getStorageSync('localOpenid')
          },
          success:(res)=>{
          that.setData({
            allCancelOrdersList:res.data.obj
          })
          },
          fail:()=>{
          console.log("查询所有已取消订单失败")
          }
          
        });
      break;
    }
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     wx.setNavigationBarTitle({
       title:"订单列表"
     })

     wx.request({
      url: 'http://120.79.45.185:801/Orders/selectAllSpecificOrdersByOpenid',
      data:{
        openid:wx.getStorageSync('localOpenid')
      },
      success:(res)=>{
      
      that.setData({
        allOrdersList:res.data.obj
      })
      },
      fail:()=>{
      console.log("查询所有订单失败")
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