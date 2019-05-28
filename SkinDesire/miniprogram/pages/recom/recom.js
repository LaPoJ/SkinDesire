// miniprogram/pages/recom/recom.js
Page({

	// 页面的初始数据
	data: {
		recoms:[
			{
				name:'傻逼面膜',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				decs: '这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述',
				tags: [{
					tagName: '控油',
					style: 'bg-red'
				},{
					tagName: '祛痘',
					style: 'bg-green'
				}]
			}, {
				name: '傻逼面膜',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				decs: '这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述',
				tags: [{
					tagName: '控油',
					style: 'bg-red'
				}, {
					tagName: '祛痘',
					style: 'bg-green'
				}]
			}, {
				name: '傻逼面膜',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				decs: '这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述',
				tags: [{
					tagName: '控油',
					style: 'bg-red'
				}, {
					tagName: '祛痘',
					style: 'bg-green'
				}]
			}, {
				name: '傻逼面膜',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				decs: '这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述，这里是面膜的描述',
				tags: [{
					tagName: '控油',
					style: 'bg-red'
				}, {
					tagName: '祛痘',
					style: 'bg-green'
				}]
			}
		]
	},

	// 生命周期函数--监听页面加载
	onLoad: function (options) {

	},


	// 生命周期函数--监听页面初次渲染完成
	onReady: function () {

	},


	// 生命周期函数--监听页面显示
	onShow: function () {

	},


	// 生命周期函数--监听页面隐藏
	onHide: function () {

	},


	// 生命周期函数--监听页面卸载
	onUnload: function () {

	},


	 //页面相关事件处理函数--监听用户下拉动作
	onPullDownRefresh: function () {

	},


	// 页面上拉触底事件的处理函数
	onReachBottom: function () {

	},

	// 用户点击右上角分享
	onShareAppMessage: function () {

	},

	// 跳转至面膜详情页
	goFacialMask(){
		wx.navigateTo({
			url: '../mask/mask',
		})
	}
})