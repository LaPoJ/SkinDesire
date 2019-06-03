Page({

	// 页面的初始数据
	data: {
		TabCur: 0,
		scrollLeft: 0,
		acne:{}, 	//青春痘
		blackhead: {}, 	//黑头
		complexion: {}, 	//肤色
		darkCircles: {}, 	//黑眼圈
		property: {}, 	//肤质
		roseAcne: {},		//玫瑰痤疮
		spot: {},		//色斑
		skins:[
			{ 
				title: "肤质",
				skinContent: [{
					name: "油性皮肤",
					question: "什么是油性皮肤？",
					desc: "油性皮肤是因人体皮脂腺分泌旺盛所产生的,皮肤中的皮脂腺特性由遗传因子决定,油性皮肤是因人体皮脂腺分泌旺盛所产生的",
					trait: "皮脂分泌旺盛，毛孔粗大，肤色较暗，油腻，容易出汗；皮肤不易老化、生皱纹；易出现痤疮，留色斑、瘢痕。在皮肤检测仪下观察，常可检测到黑头或白头等分泌物；夏季是油性皮肤的多发季节"
				},
				{
					name: "干性皮肤",
					question: "什么是干性皮肤？",
					desc: "干性皮肤是指因皮脂腺分泌的减少及皮肤屏障损伤造成经表皮失水增加而造成皮肤角质层水分低于10%的肤质。其表面肤质较轻薄，皮肤上很少长粉刺和暗疮，毛孔不明显",
					trait: "肤质细腻，较薄，毛孔不明显，皮脂分泌少而均匀，无油腻感；皮肤较干燥，易出现皮屑，不易生痤疮。但受外界环境刺激后，如风吹日晒等，皮肤会出现潮红，甚至是灼痛。该肤质易老化起皱纹，尤其是眼部周围、嘴角等处"
				},
				{
					name: "中性皮肤",
					question: "什么是中性皮肤？",
					desc: "中性皮肤是健康理想的皮肤，皮脂分泌量适中，介于干性和油性皮肤之间，对外界刺激不敏感。中性皮肤易受季节变化的影响，冬天较干燥，夏天较油腻。",
					trait: "角质层的含水量适中，皮脂分泌通畅，纹理细腻、柔软、稳定，组织滑而细，没有粗大的毛孔或太油腻的部位，红润光泽富有弹性，无瑕疵；毛孔细小，但易受季节变化影响，夏天趋于油性，冬春季趋于干性；外观感觉光滑、新鲜、清洁、有健康色彩；放大镜下光滑幼嫩、柔软、不厚不薄，没有油腻感"
				},
				{
					name: "混合性皮肤",
					question: "什么是混合性皮肤？",
					desc: "混合性皮肤兼有油性皮肤与干性皮肤的共同特性。临床常见的表现为额部、鼻部、口周、下颌部位油脂分泌旺盛，皮肤油腻、纹理粗、毛孔大，皮肤pH值较健康皮肤偏碱，容易滋生细菌，导致痤疮及黑头的发生，但患者感觉皮肤干，特别是面颊口周部常出现缺水皮肤表现",
					trait: ""
				}
				]
			}, { 
				title: "肤色",
				skinContent: [
					{
						name: "自然",
						question: "自然的肤色？",
						desc: "这就是自然的肤色"
					}
				]
			}, { 
				title: "色斑" 
			},
			{ title: "痘痘" },
			{ title: "玫瑰痤疮" },
			{ title: "黑头"},
			{ title: "黑眼圈"}	
		]
	},

	// 生命周期函数--监听页面加载
	onLoad: function (options) {
		wx.cloud.callFunction({
			name: 'getSkin',
			success: res => {
				this.setData({
					acne: res.result.data.acne,
					blackhead: res.result.data.blackhead,
					complexion: res.result.data.complexion,
					darkCircles: res.result.data.darkCircles,
					property: res.result.data.property,
					roseAcne: res.result.data.roseAcne,
					spot: res.result.data.spot
				})
			}
		})
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

	// 页面相关事件处理函数--监听用户下拉动作
	onPullDownRefresh: function () {
		
	},

	// 页面上拉触底事件的处理函数
	onReachBottom: function () {
		
	},

	// 用户点击右上角分享
	onShareAppMessage: function () {
		
	}
})