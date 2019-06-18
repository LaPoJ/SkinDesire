const db = wx.cloud.database()
const maskCollection = db.collection('mask')
// const _ = db.command

Page({

	//页面的初始数据
	data: {
		mask: {}
	},

	//生命周期函数--监听页面加载
	onLoad: function (options) {
		// console.log(options)
		const { _id } = options
		
		wx.showLoading({
			title: '加载中...',
		})

		wx.getStorage({
			key: 'mask',
			success:res => {
				console.log(res)
				this.setData({
					mask: res.data
				})
			},
		})

		// maskCollection.where({
		// 	_id
		// }).get()
			// .then(res => {
			// 	const { desc, imgUrl, pInfo, pName, price } = res.data[0]
			// 	this.setData({
			// 			mask: {
			// 				desc, 
			// 				imgUrl, 
			// 				pInfo, 
			// 				pName, 
			// 				price
			// 			}
			// 		})
			// })
		wx.hideLoading()
	},
})