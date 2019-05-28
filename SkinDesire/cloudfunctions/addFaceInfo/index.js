// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const faceInfo = db.collection('faceInfo')
// 云函数入口函数
exports.main = async (event, context) => {
	try{
		const wxContext = cloud.getWXContext()

		const { faces } = event
		const openid = wxContext.OPENID

		const faceResult = await faceInfo.where({
			_openid: openid
		}).get()

		if (!faceResult.data.length) {
			return await faceInfo.add({
				data: {
					_openid: openid,
					...faces[0]
				}
			})
		} else {
			return await faceInfo.where({
				_openid: openid
			}).update({
				data: {
					_openid: openid,
					...faces[0]
				}
			})
		}
	}catch(err){
		return {
			err
		}
	}
}