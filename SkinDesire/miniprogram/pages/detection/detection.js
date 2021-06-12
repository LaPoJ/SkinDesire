const app = getApp()
const faceAPI = require('../../uitls/config')

Page({

  //页面的初始数据
  data: {
    btnHidden: true,
    camearHidden: false,
    imageHidden: false,
    tempFilePath: '',
    imageBS64: '',
		isDetection: false,
		faces: []
  },


  // 生命周期函数--监听页面加载
  onLoad: function(options) {

  },

	// 获取人脸检测结果
  getFaceResult() {
		const _this = this
    const APIKEY = faceAPI.api_key
    const APISERET = faceAPI.api_secret
    let base64Image = this.data.imageBS64
		let attributes = 'gender,age,blur,facequality,beauty,skinstatus'

		wx.cloud.callFunction({
			name: "getFace",
			data: {
				APIKEY,
				APISERET,
				base64Image
			},
			success: res => {
				console.log(res)
			}
		}).then(res => {
			console.log(res)
		})

		// face++ API
    wx.request({
      url: "https://api-cn.faceplusplus.com/facepp/v3/detect",
      method: "POST",
      data: {
        api_key: faceAPI.api_key,
        api_secret: faceAPI.api_secret,
        image_base64: base64Image,
        return_landmark: 2,
        return_attributes: attributes
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        if (res.data.faces.length == 0) {
          wx.hideLoading()
					this.setData({
						isDetection: false
					})
          wx.showModal({
            title: '警告',
            showCancel: false,
            content: '未检测到人脸，请重新拍照检测',
          })
        } else {
					wx.hideLoading()
					this.setData({
						isDetection: false,
						faces: res.data.faces
					})

					wx.showLoading({
						title: '结果生成中',
					})
					wx.cloud.callFunction({
						name:'addFaceInfo',
						data: {
							faces: _this.data.faces
						},
						success: res => {
							wx.navigateTo({
								url: '../result/result',
							})
							wx.hideLoading()
						}
					})
        }
      },
      fail: err => {
				wx.showModal({
					title: '错误提示',
					showCancel: false,
					content: '发生未知错误，请重试',
				})
      }
    })
  },

	// 检测中
  goResult() {
    let that = this
    wx.showLoading({
      title: '检测中...',
    })
		this.setData({
			isDetection: true
		})
		this.getFaceResult()
  },

	// 获取照片
  takePhoto() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera', 'album'],
      success: function(res) {
				wx.showLoading({
					title: '加载中',
				})
				const tempFilePaths = res.tempFilePaths
				that.goUploadFile(tempFilePaths)
      }
    })
  },

	// 上传文件
	goUploadFile(tempFilePaths){
		let _this = this
		let randString = Math.floor(Math.random() * 1000000).toString() + '.png'
		wx.cloud.uploadFile({
			cloudPath: 'uploadFace/' + randString,
			filePath: tempFilePaths[0],
			success: res => {
				const { fileID } = res
				_this.getFaceFlieURL(fileID)
			}
		})
	},

	// 获取文件的真实URL
	getFaceFlieURL(fileID){
		let _this = this
		wx.cloud.getTempFileURL({
			fileList: [fileID],
			success: res => {
				let { fileList } = res
				_this.urlTobase64(fileList[0].tempFileURL)
				_this.setData({
					tempFilePath: fileList[0].tempFileURL,
					btnHidden: false,
					camearHidden: true,
					imageHidden: false
				})
			},
			fail: err => {
				wx.showModal({
					title: '错误提示',
					showCancel: false,
					content: '发生未知错误，请重试',
				})
			},
			complete: () => {
				wx.hideLoading()
			}
		})
	},

	// 图片转64
  urlTobase64(url) {
    wx.request({
      url: url,
      responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
      success: res => {
        //把arraybuffer转成base64
        let base64 = wx.arrayBufferToBase64(res.data);

        //不加上这串字符，在页面无法显示的哦
        base64　 = 'data:image/png;base64,' + base64

        this.setData({
          imageBS64: base64
        })
      }
    })
  }
})