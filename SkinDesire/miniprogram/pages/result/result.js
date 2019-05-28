// miniprogram/pages/result/result.js
Page({

  // 页面的初始数据
  data: {
    resultHidden: true,
    loadHidden: false,
		footBtnHide: false,
		percentage: 0, //评分
    animTime: '', // 动画执行时间
    // attributes: {}, //脸部数据
		skinstatus: {},
		beauty: {}, // 颜值
		gender: {}, //性别
		age: {}, //年龄
		isMale: false
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
		wx.showLoading({
			title: '数据加载中',
		})
		if(options.footBtnHide){
			this.setData({
				footBtnHide: options.footBtnHide
			})
		}
		wx.cloud.callFunction({
			name: 'getFaceInfo',
			success: res => {
				console.log(res)
				const attributes = res.result.data[0].attributes //脸部数据
				const skinstatus = attributes.skinstatus //脸部肤质
				const beauty = attributes.beauty
				const gender = attributes.gender //性别
				const age = attributes.age  // 年龄
				const facequality = attributes.facequality

				let percentage = 0 // 脸部评分

				// 颜值分数取整
				let beautyToFloor = { female_score: 0, male_score: 0 }
				beautyToFloor.female_score = Math.floor(beauty.female_score)
				beautyToFloor.male_score = Math.floor(beauty.male_score)	

				percentage = facequality.value

				this.setData({
					percentage,
					// attributes,
					skinstatus,
					beauty: beautyToFloor,
					gender,
					age,
					resultHidden: false,
					loadHidden: true,
				})
				wx.hideLoading()
				this.draw('runCanvas', this.data.percentage, 1000)
			}
		})

		// 总分
		
  },

	// canvas
  canvasTap(start, end, time, w, h) {
    var that = this;
    start++;
    if (start > end) {
      return false;
    }
    that.run(start, w, h);
    setTimeout(function() {
      that.canvasTap(start, end, time, w, h);
    }, time);
  },
  // 评分动画
  run(c, w, h) {
    let that = this;
    var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
    that.data.ctx2.arc(w, h, w - 8, -0.5 * Math.PI, num); //每个间隔绘制的弧度
    that.data.ctx2.setStrokeStyle("#B9E6E7");
    that.data.ctx2.setLineWidth("6");
    that.data.ctx2.setLineCap("round");
    that.data.ctx2.stroke();

    that.data.ctx2.beginPath();
    that.data.ctx2.setFontSize(20); //注意不要加引号
    that.data.ctx2.setFillStyle("#000");
    that.data.ctx2.setTextAlign("center");
    that.data.ctx2.setTextBaseline("middle");
    that.data.ctx2.fillText(c + "分", w, h);
    that.data.ctx2.draw();
  },
	// canvas
  draw: function(id, percent, animTime) {
    var that = this;
    const ctx2 = wx.createCanvasContext(id);
    that.setData({
      ctx2: ctx2,
      percentage: percent,
      animTime: animTime
    });
    var time = that.data.animTime / that.data.percentage;
    wx.createSelectorQuery().select('#' + id).boundingClientRect(function(rect) {
      //监听canvas的宽高
      var w = parseInt(rect.width / 2);
      //获取canvas宽的的一半
      var h = parseInt(rect.height / 2);
      //获取canvas高的一半
      that.canvasTap(0, that.data.percentage, time, w, h)
    }).exec();
  },

  goIndex() {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  goDetection() {
    wx.navigateBack({
			url: '../detection/detection'
    })
  }
})