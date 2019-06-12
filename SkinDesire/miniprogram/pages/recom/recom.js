// miniprogram/pages/recom/recom.js
Page({

	// 页面的初始数据
	data: {
		page: 0,
		isLoading: false,
		masks: []
	},

	// 生命周期函数--监听页面加载
	onLoad: function (options) {
		let _this = this
		wx.cloud.callFunction({
			name: 'getMasks',
			data: {
				page: _this.data.page
			},
			success: maskRes =>{
				_this.setData({
					masks: maskRes.result.data
				})
			}
		})
	},


	// 生命周期函数--监听页面初次渲染完成
	onReady: function () {

	},

	 //页面相关事件处理函数--监听用户下拉动作
	onPullDownRefresh: function () {

	},


	// 页面上拉触底事件的处理函数
	onReachBottom: function () {
		this.setData({
			isLoading: true
		})
		const _this = this
		let page = this.data.page + 20
		wx.cloud.callFunction({
			name: 'getMasks',
			data: {
				page
			},
			success: newMaskRes => {
				const old_masks = _this.data.masks
				const new_masks = newMaskRes.result.data
				if (new_masks.length == 0){
					wx.showToast({
						title: '没有更多了...',
						icon: 'none'
					})
					_this.setData({
						isLoading: false
					})
				}else{
					_this.setData({
						masks: old_masks.concat(new_masks),
						page: page,
						isLoading: false
					})
				}
			}
		})
	},

	// 用户点击右上角分享
	onShareAppMessage: function () {

	},

	// 跳转至面膜详情页
	goFacialMask(event){
		// console.log(event)
		const index = event.currentTarget.dataset.postid
		const mask = this.data.masks[index]
		
		wx.navigateTo({
			url: '../mask/mask?_id=' + mask._id
			// url: `../mask/mask?desc=${mask.desc}&imgUrl=${mask.imgUrl}&pInfo=${mask.pInfo}&pName=${mask.pName}&price=${mask.price}`
		})
	}
})