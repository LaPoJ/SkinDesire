const app = getApp()
const db = wx.cloud.database()
const userInfoCollection = db.collection('userInfo')

Page({

  // 页面的初始数据
  data: {
    userInfo: {},
    userInfos: [],
		DotStyle:'square-dot',
    elements: [{
        title: '肤质检测',
				name: 'detection',
        color: 'cyan',
        icon: 'newsfill',
				url: '../detection/detection'
      },
      {
        title: '好用面膜',
				name: 'recommend',
				color: 'mauve',
        icon: 'colorlens',
				url: '../recom/recom'
      },
      {
        title: '知识百解',
				name: 'explanation',
        color: 'purple',
        icon: 'font',
				url: '../explan/explan'
      },
      {
        title: '可爱的我 ',
        name: 'mine',
        color: 'blue',
        icon: 'icon',
				url: '../mine/mine'
      }     
    ],
		cardCur: 0,
		swiperList: [{
			id: 0,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
		}, {
			id: 1,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
		}, {
			id: 2,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
		}, {
			id: 3,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
		}, {
			id: 4,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
		}, {
			id: 5,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
		}, {
			id: 6,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
		}],
  },


  // 生命周期函数--监听页面加载

  onLoad: function(options) {
  },

	// cardSwiper
	cardSwiper(e) {
		this.setData({
			cardCur: e.detail.current
		})
	}
})