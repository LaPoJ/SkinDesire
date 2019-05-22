const app = getApp();

Page({

  // 页面的初始数据
  data: {
    userInfo: {}
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
		let that = this
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
						withCredentials: 'false',
						lang: 'zh_CN',
						timeout: 10000,
						success: (res) => {
							that.setData({
								userInfo: res.userInfo
							})
						}
					})
				}
			}
		})
  },
  onReady(){
		
  }
})