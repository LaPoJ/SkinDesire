const cloud = require('wx-server-sdk')
const request = require('request');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

	return new Promise((resolve, reject) => {
		const url = "https://api-cn.faceplusplus.com/facepp/v3/detect"
		const { APIKEY, APISERET, base64Image } = event
		console.log(APIKEY, APISERET, base64Image)
		const attributes = 'gender,age,blur,facequality,beauty,skinstatus'
		request({
			url: url,
			method: "POST",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				"api_key": "Rv9mO6aLclQsn_EoOb4RpF1gn4b6P3Nu",
				"api_secret": "lgXaiCpSVwwrmTGsXTxSar3UJxUu-EXs",
				image_base64: base64Image,
				return_landmark: 2,
				return_attributes: attributes
			}
		}, function (err, res, body) {
			if (err) {
				reject(err)
			}
			resolve(body)
		})
	})
}