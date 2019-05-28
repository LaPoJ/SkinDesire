const app = getApp()

const db = wx.cloud.database()
const userInfoCollection = db.collection('userInfo')

Page({

  // 页面的初始数据
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    isLogin: false
  },

  // 用户点击授权登录
  onWeixinLogin(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.handleLogin()
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入',
        showCancel: false,
        confirmText: '返回授权'
      })
    }
  },

  // 获取用户信息
  handGetUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                const userInfo = res.userInfo
                resolve(userInfo)
              },
              fail: err => {
                reject(err)
              }
            })
          }
        }
      })
    })
  },

  // 登录
  handleLogin() {
    let that = this
    wx.showLoading({
      title: '正在登录',
      icon: 'loading',
    })
    this.handGetUserInfo()
      .then(userInfo => {
        this.setData({
          userInfo
        })
				// 全局存储用户信息
				app.globalData.userInfo = userInfo

				// 登录
        wx.login({
          success: (loginRes) => {
            const {
              code
            } = loginRes
            const userinfo = userInfo

						// 调用云函数获取sessionKey
            wx.cloud.callFunction({
              name: 'getSessionKey',
              data: {
                code,
                userinfo
              },
              success: res => {
                // session秘钥
                const skey = res.result.skey
                wx.setStorageSync('skey', skey)
                // 登录成功
                this.handleFetchUserInfo()
                wx.hideLoading()
								this.redirectToIndex()
              }
            })
          }
        })
      })
  },

  handleFetchUserInfo() {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        const { openid } = res.result
				app.globalData.openid = openid
        db.collection('userInfo')
          .where({
            _openid: openid
          }).get({
            success: res => {
              const { _id, ...userInfo } = res.data[0]
              this.setData({
                userInfo,
                isLogin: true
              })
            }
          })
      }
    })
  },

  onLoad: function() {
    const skey = wx.getStorageSync('skey')
    if (skey) {
      wx.checkSession({
        success: () => {
          this.setData({
            isLogin: true
          })
          this.handleFetchUserInfo()
					this.redirectToIndex()
        },
        fail: () => {
          this.setData({
            isLogin: false
          })
        }
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
  },

	// 页面跳转
  redirectToIndex() {
      wx.redirectTo({
        url: '../index/index',
      })
  }
})